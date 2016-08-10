(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('app', [
		'ui.router',
		'ui.bootstrap',
		'angularMoment',
		'ngCookies',
		'ngFileUpload'
	]);
	
	//Routes defined in router.js
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('about_controller', ["$scope", "$log", function about_controller($scope, $log) {
			console.log("About controller loaded.");
        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('booking_controller', function booking_controller() {
			console.log("Booking controller loaded.");
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('contact_controller', ["$scope", "$log", function contact_controller($scope, $log) {
			console.log("Contact controller loaded.");
        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', ["$scope", "$state", "$http", "$log", "$cookieStore", "Upload", function home_controller($scope, $state, $http, $log, $cookieStore, Upload) {

        }]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('image_controller', ["$scope", "$state", "$http", "$q", "$log", "$cookieStore", "Upload", function image_controller($scope, $state, $http, $q, $log, $cookieStore, Upload) {
			
			getImages();
			
			$scope.delete= function(event){
				$http.delete('/api/images/'+event.target.id)
					.success(function(res){
						console.log("Successfully deleted!")
						getImages();
					});
			};

			$scope.uploadFiles = function(files, errFiles) {
				$scope.files = files;
				$scope.errFiles = errFiles;
				angular.forEach(files, function(file) {
				
					file.upload = Upload.upload({
						url: '/api/images/',
						data: {file: file, 'category': $scope.selCat}
					});

					file.upload.then(function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': ' + response.data;
					}, function (evt) {
						file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					});
				});
				getImages();
			}	
			
			$scope.addCat = function(cat){
				$scope.categories.push(cat);
				$scope.newCat = "";
				$scope.selCat = cat;
			};
			
			function getCategories(){
				$scope.categories = [];
				$scope.categories[0] = $scope.selCat = "Default";
				angular.forEach($scope.images, function (image){
					if (image.category && $scope.categories.indexOf(image.category) < 0){
						$scope.categories.push(image.category);
					}
				});
			}
			
			function getPromiseImages() {
				var deferred = $q.defer();
				$http.get('/api/images').then(
					function handleSuccess(response) {
                        console.log('Got promise list of images.');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('Promise list of images failed.');
                    });
                return deferred.promise;
			}
			
			function getImages(){
				getPromiseImages().then(function(data){
					$scope.images = data;
					getCategories();
				});
			}

        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('login_controller', ["$scope", "$state", "$http", "$log", "$cookieStore", function login_controller($scope, $state, $http, $log, $cookieStore) {
			
			$scope.login = function(user) {
				$http.post("/users/login", user)
					.success(function(data, status){
						console.log('success');
						$cookieStore.put('auth', true);
						$state.go('home');
					})
					.error(function (data, status, headers, config, statusTxt) {
						console.log("Error: " + data);
						console.log(config);
						$scope.error = true;
					});
			};
			
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('logout_controller', ["$scope", "$rootScope", "$log", "$cookieStore", function logout_controller($scope, $rootScope, $log, $cookieStore) {
			
			$scope.logout = function(){
				$rootScope.auth = false;
				$cookieStore.put('auth', false);
			};
			
		}]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('register_controller', ["$scope", "$state", "$http", "$log", function register_controller($scope, $state, $http, $log) {
			console.log("Register controller loaded");
			
			$scope.register = function(user) {
				$http.post("/users/register", user)
					.success(function(data, status){
						console.log('success');
						$state.go('login');
					})
					.error(function (data, status, headers, config, statusTxt) {
						console.log("Error: " + data);
						console.log(config);
						$scope.error = true;
					});
			};
        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('user_controller', ["$scope", "$rootScope", "$state", "$http", "$log", "$cookieStore", "Upload", function user_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {

			$scope.refresh = function(){
				$http.get('/users').success(function(data){
					$scope.users = data;
				})
			};


			$http.get('/users').success(function(data){
				$scope.users = data;
			});
			
			
        }]);
})();
angular.module('app')
	.directive('bookingCalendar', function() {
		return {
			restrict: 'E',
			template: '<div>This is the Booking Calendar.</div>'
  		};
	});
angular.module('app')
	.directive('currentBooking', function() {
		return {
			restrict: 'E',
			template: '<div>These are the Current Bookings.</div>'
  		};
	});
angular.module('app')
	.directive('pendingBooking', function() {
		return {
			restrict: 'E',
			template: '<div>These are the Pending Bookings.</div>'
  		};
	});
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
						  if (!$cookieStore.get('auth')){
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
				  controller: "home_controller",
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
			  })
			  .state('user', {
			  	url:"/usermanager",
			  	templateUrl: "users.html",
			  	controller: "user_controller",
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