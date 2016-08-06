(function () {
    'use strict';

    angular
        .module('app')
        .controller('about_controller', function about_controller($scope, $log) {
			console.log("About controller loaded.");
        });
})();