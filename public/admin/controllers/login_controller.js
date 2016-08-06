(function () {
    'use strict';

    angular
        .module('app')
        .controller('login_controller', function login_controller($scope, $rootScope, $state, $http, $log, $cookieStore) {
			console.log("Login controller loaded");
			
			$scope.login = function(user) {
				$http.post("/users/login", user)
					.success(function(data, status){
						console.log('success');
						$rootScope.auth = true;
						$cookieStore.put('auth', true);
						$state.go('home');
					})
					.error(function (data, status, headers, config, statusTxt) {
						console.log("Error: " + data);
						console.log(config);
						$scope.error = true;
					});
			};
			
        });
})();
