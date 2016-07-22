(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
          
            $urlRouterProvider.otherwise("/");
            
            $stateProvider
              .state('home', {
                  url: "/",
                  templateUrl: "home.html",
                  controller: "home_controller"
              })
			  .state('mainState', {
				  url: "/main",
				  templateUrl: "main.html",
				  controller: "main_controller"
			  })
			  .state('contact', {
				  url: "/contact",
				  templateUrl: "contact.html",
				  controller: "contact_controller"
			  })
			  .state('about', {
				  url: "/about",
				  templateUrl: "about.html",
				  controller: "about_controller"
			  })
			  .state('register', {
				  url: "/register",
				  templateUrl: "register.html",
				  controller: "register_controller"
			  });
        });
})();
