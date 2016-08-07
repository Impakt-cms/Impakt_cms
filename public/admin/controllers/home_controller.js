(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', function home_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {
			
			$rootScope.auth = $cookieStore.get('auth');
			if ($rootScope.auth) console.log("Home controller loaded");
			
			

			
			
        });
})();
