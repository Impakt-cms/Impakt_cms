(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('app', ['ui.router', 'ui.bootstrap', 'angularMoment', 'ngCookies', 'ngFileUpload'])
	//declare authentication global variable.
	.run(function($rootScope, $cookieStore) {
		$rootScope.auth = false;
		$cookieStore.put('auth', false);
	});
	
	//Routes defined in router.js
})();