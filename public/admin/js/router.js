(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
          
            $urlRouterProvider.otherwise("/home");
            
            $stateProvider
              .state('login', {
                  url: "/",
                  templateUrl: "login.html",
                  controller: "login_controller",
				  resolve: {
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if (!$cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }
              })
			  .state('home', {
				  url: "/home",
				  templateUrl: "home.html",
				  controller: "home_controller",
				  resolve: {
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }				
			  })
			  .state('booking', {
				  url: "/booking",
				  templateUrl: "booking.html",
				  controller: "booking_controller",
				  resolve: {
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }
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
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }
			  })
			  .state('user', {
			  	url:"/usermanager",
			  	templateUrl: "users.html",
			  	controller: "user_controller",
			  	resolve: {
					  load: function($q, $cookieStore){
						  var deferred = $q.defer();
						  if ($cookieStore.get('auth')){
							  deferred.resolve();
						  } else {
							  deferred.reject();
						  }
						  return deferred.promise;
					  }
				  }
			  });
        });
})();