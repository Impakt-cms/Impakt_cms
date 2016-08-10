(function () {
    'use strict';

    angular
        .module('app')
        .controller('login_controller', function login_controller($scope, $state, $http, $log, $cookieStore) {
			
			$scope.login = function(user) {
				$http.post("/users/login", user)
					.success(function(data, status){
						console.log('success');
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
