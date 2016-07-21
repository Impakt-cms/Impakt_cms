(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('scotchApp', ['ui.router', 'ui.boostrap', 'angularMoment']);

	//Routes defined in router.js
	
    // create the controller and inject Angular's $scope
    app.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    app.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
	
})();