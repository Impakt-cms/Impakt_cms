(function () {
    'use strict';

    angular
        .module('app')
        .controller('logout_controller', function logout_controller($scope, $rootScope, $log, $cookieStore) {
			
			$scope.logout = function(){
				$rootScope.auth = false;
				$cookieStore.put('auth', false);
			};
			
		});
})();