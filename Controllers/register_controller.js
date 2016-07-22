(function () {
    'use strict';

    angular
        .module('app')
        .controller('register_controller', function register_controller($scope, $state, $http, $log) {
			console.log("Register controller loaded");
			
			$scope.register = function(user) {
				$http.post("/users/register", user)
					.success(function(data, status){
						console.log('success');
						$state.go('home');
					})
					.error(function (data, status, headers, config, statusTxt) {
						console.log("Error: " + data);
						console.log(config);
					});
			};
        });
})();