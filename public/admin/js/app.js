(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('app', [
		'ui.router',
		'ui.bootstrap',
		'angularMoment',
		'ngCookies',
		'ngFileUpload'
	])
	
	.config(['$compileProvider', function($compileProvider){
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|content):/);
	}]);
	
	//Routes defined in router.js
})();