(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', function home_controller($scope, $rootScope, $state, $http, $log) {
			console.log("Home controller loaded");
        });
})();
