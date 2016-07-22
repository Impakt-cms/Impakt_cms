(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('app', ['ui.router', 'ui.bootstrap', 'angularMoment'])
	//declare authentication global variable.
	.run(function($rootScope) {
		$rootScope.auth = false;
	});
	
	//Routes defined in router.js
})();