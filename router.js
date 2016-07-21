(function () {
    'use strict';

    angular
        .module('scotchApp')
        .config(function ($stateProvider, $urlRouterProvider) {
          
            $urlRouterProvider.otherwise("/");
            
            $stateProvider
              .state('home', {
                  url: "/",
                  templateUrl: "/Views/home.html",
                  controller: "home_controller"
              });
        });
})();
