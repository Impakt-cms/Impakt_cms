(function () {
    'use strict';

    angular
        .module('app')
        .controller('main_controller', function main_controller($scope, $log) {
			console.log("Main controller loaded.");
        });
})();