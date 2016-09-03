(function () {
    'use strict';

    angular
        .module('app')
        .controller('image_controller', function image_controller($scope, $state, $http, $q, $log, $cookieStore, Upload, $mdDialog) {
			
			getImages();


			$scope.customFullscreen = false;
		$scope.showAdvanced = function(data,id,title) {
			console.log(data);
    		$mdDialog.show({
    		scope:$scope,
     		controller: ['$scope', 'data','id','title', function($scope, data,id,title) {
     			console.log(title);
            $scope.src = data;
            $scope.id=id;
            $scope.title=title;

            $scope.cancel = function() {
      		$mdDialog.cancel();
   		 };
            
          }],
      		templateUrl: 'img-popup.partial.html',
      		parent: angular.element(document.body),
      		targetEvent: data,
      		locals:{
      			data:data,
      			id: id,
      			title:title
      		},
      		clickOutsideToClose:true,
      		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  };

 



			$scope.delete= function(event){
				$http.delete('/api/images/'+event.target.id)
					.success(function(res){
						console.log("Successfully deleted!")
						getImages();
					});
			};

			$scope.uploadFiles = function(files, errFiles) {
				$scope.files = files;
				$scope.errFiles = errFiles;
				angular.forEach(files, function(file) {
				
					file.upload = Upload.upload({
						url: '/api/images/',
						data: {file: file, 'category': $scope.selCat}
					});

					file.upload.then(function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': ' + response.data;
					}, function (evt) {
						file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					});
				});
				getImages();
			}	
			
			$scope.addCat = function(cat){
				$scope.categories.push(cat);
				$scope.newCat = "";
				$scope.selCat = cat;
			};
			
			function getCategories(){
				
				$scope.categories = [];
				$scope.categories[0] = $scope.selCat = "General";
				angular.forEach($scope.images, function (image){
					if (image.category && $scope.categories.indexOf(image.category) < 0){
						$scope.categories.push(image.category);
					}
				});
			}
			
			function getPromiseImages() {
				var deferred = $q.defer();
				$http.get('/api/images').then(
					function handleSuccess(response) {
                        console.log('Got promise list of images.');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('Promise list of images failed.');
                    });
                return deferred.promise;
			}
			



			function getImages(){
				getPromiseImages().then(function(data){
					$scope.images = data;
					getCategories();
				});

			}


			function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

        });
})();