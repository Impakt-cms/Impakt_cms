(function () {
    'use strict';

    angular
        .module('app')
        .controller('image_controller', function image_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {
			console.log("Image controller loaded");
			
			$rootScope.auth = $cookieStore.get('auth');
			if ($rootScope.auth) console.log("Image controller loaded");
			
			$http.get('/api/images').success(function(data){
            
			$scope.images = data;
           
			});



		$scope.refresh = function(){
			$http.get('/api/images').success(function(data){
			$scope.images = data;
			})
		};

		$scope.delete= function(event){
			$http.delete('/api/images/'+event.target.id).success(function(res){
				console.log("Successfully deleted!")
				$scope.refresh();
			}

			)}


		$scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            
            file.upload = Upload.upload({
  				url: '/api/images/',
                data: {file: file }
            });

            file.upload.then(function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    	}	

    	$scope.refresh();

        })
         


        

        ;
})();