(function () {
    'use strict';

    angular
        .module('app')
        .controller('user_controller', function user_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {
			
			$rootScope.auth = $cookieStore.get('auth');
			if ($rootScope.auth) console.log("Home controller loaded");
			
			$scope.refresh = function(){
			$http.get('/users').success(function(data){
			$scope.users = data;
			})
		};


			$http.get('/users').success(function(data){
            
			$scope.users = data;
           
			});
			
			
        });
})();