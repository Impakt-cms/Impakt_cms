(function () {
    'use strict';

    angular
        .module('app')
        .controller('user_controller', function user_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {

			


			$http.get('/users').success(function(data){
				$scope.users = data;
			});

			
			$scope.delete= function(event){
				$http.delete('/users/display/'+event.target.id)
					.success(function(res){
						console.log("Successfully deleted!")
						
					});
					getUsers();
			};

			function getUsers(){

				$http.get('/users').success(function(data){
					$scope.users = data;
				})
			}

			
        });
})();