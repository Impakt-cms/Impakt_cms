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
	//declare authentication global variable.
	.run(["$rootScope", "$cookieStore", function($rootScope, $cookieStore) {
		$rootScope.auth = false;
		$cookieStore.put('auth', false);
	}]);
	//Routes defined in router.js
})();
//This is a placeholder for custom js files
(function () {
    'use strict';

    angular
        .module('app')
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
          
            $urlRouterProvider.otherwise("/home");
            
            $stateProvider
              .state('login', {
                  url: "/",
                  templateUrl: "login.html",
                  controller: "login_controller",
				  resolve: {
					  load: ["$q", "$cookieStore", function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth') == false){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }]
				  }
              })
			  .state('home', {
				  url: "/home",
				  templateUrl: "home.html",
				  controller: "home_controller"
				  /*resolve: {
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }	*/			
			  })
			  .state('contact', {
				  url: "/contact",
				  templateUrl: "contact.html",
				  controller: "contact_controller"
			  })
			  .state('booking', {
				  url: "/booking",
				  templateUrl: "booking.html",
				  controller: "booking_controller"
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
			  })
			  .state('image', {
			  	url:"/imagemanager",
			  	templateUrl: "imageUpload.html",
			  	controller: "image_controller",
			  	resolve: {
					  load: ["$q", "$cookieStore", function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }]
				  }
			  });


        }]);
})();