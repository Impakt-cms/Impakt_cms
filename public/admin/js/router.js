(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
          
            $urlRouterProvider.otherwise("/admin");
            $locationProvider.html5Mode({
            	enabled: true,
				 requireBase: false
            	
            	});
            
            $stateProvider
              .state('login', {
                  url: "/admin",
                  templateUrl: "/admin/login.html",
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
				  url: "/admin/home",
				  templateUrl: "/admin/home.html",
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
				  url: "/admin/booking",
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
				  url: "/admin/register",
				  templateUrl: "register.html",
				  controller: "register_controller"
			  })
			  .state('image', {
			  	url:"/admin/imagemanager",
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
			  	url:"/admin/usermanager",
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