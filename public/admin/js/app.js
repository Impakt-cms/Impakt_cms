(function () {
    'use strict';
    
	//Declare module dependencies.
	angular.module('app', [
		'ui.router',
		'ui.bootstrap',
		'angularMoment',
		'ngCookies',
		'ngFileUpload'
	])
	//Get scope variable based of logged in status.
	.run(function($rootScope, $cookieStore){
		$rootScope.auth = $cookieStore.get('auth');
	});
	
	//View routes defined in router.js
})();