(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', function home_controller($scope, $state, $http, $q, $log, $cookieStore, Upload) {
        	getImages();




        	function getImages(){
				getPromiseImages().then(function(data){
					$scope.images = data;
					
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

        });
})();
