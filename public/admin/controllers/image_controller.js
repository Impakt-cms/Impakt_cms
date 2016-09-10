(function () {
    'use strict';

    angular
        .module('app')
        .controller('image_controller', function image_controller($scope, $state, $http, $q, $log, $cookieStore, Upload, $mdDialog) {
			
			getImages();
			$scope.customFullscreen = false;


		$scope.showAdvanced = function(img) {
			console.log(img);
    		$mdDialog.show({
     		controller: ['$scope', 'img','$mdDialog', function($scope,img,$mdDialog) {
     		
            $scope.src = img.file_path;
            $scope.id= img._id;
            $scope.title=img.meta.Title;
            $scope.category=img.category;
            $scope.sort = img.sort;

            $scope.delete= function(id){
				$http.delete('/api/images/'+id)
					.success(function(res){
						console.log("Successfully deleted!")
						getImages();
					});
					$mdDialog.hide()
			};


            $scope.update = function(id){
            	var url ='/api/images/'+id;

            	var data = {
            		title:$scope.title,
            		category:$scope.category,
            		sort:$scope.sort
            	}

            	$http.put(url,data).success(function(){
            		getImages();
            	})
            	.then(function(){
            		console.log("Succesfully updated an image");
            	})
            	
            	$mdDialog.hide()
            	

            }





            $scope.cancel = function() {
      		$mdDialog.hide();
      		console.log("closed");
   		 };
            
          }],
      		templateUrl: 'img-popup.partial.html',
      		parent: angular.element(document.body),
      		targetEvent: img,
      		locals:{
      			img:img,
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
					file.upload.success(function(){

						getImages();
					}).then(function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': ' + response.data;
					}, function (evt) {
						file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					});
				});
				
			}	
			
			$scope.addCat = function(cat){
				$scope.categories.push(cat);
				$scope.newCat = "";
				$scope.selCat = cat;
			};
			
			function getCategories(){
				
				$scope.categories = [];
				$scope.categories[0] = $scope.selCat = "Splash";
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
					$scope.$applyAsync(function(){
						console.log(JSON.stringify(data));
						$scope.images = data;
					getCategories();
					
						
					});
					
				});

			}


        });
})();