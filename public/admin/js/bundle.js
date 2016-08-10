!function(){"use strict";angular.module("app",["ui.router","ui.bootstrap","angularMoment","ngCookies","ngFileUpload"])}(),function(){"use strict";angular.module("app").controller("about_controller",["$scope","$log",function(o,e){console.log("About controller loaded.")}])}(),function(){"use strict";angular.module("app").controller("booking_controller",function(){console.log("Booking controller loaded.")})}(),function(){"use strict";angular.module("app").controller("contact_controller",["$scope","$log",function(o,e){console.log("Contact controller loaded.")}])}(),function(){"use strict";angular.module("app").controller("home_controller",["$scope","$state","$http","$log","$cookieStore","Upload",function(o,e,t,r,l,n){}])}(),function(){"use strict";angular.module("app").controller("image_controller",["$scope","$state","$http","$q","$log","$cookieStore","Upload",function(o,e,t,r,l,n,c){function a(){o.categories=[],o.categories[0]=o.selCat="Default",angular.forEach(o.images,function(e){e.category&&o.categories.indexOf(e.category)<0&&o.categories.push(e.category)})}function s(){var o=r.defer();return t.get("/api/images").then(function(e){console.log("Got promise list of images."),o.resolve(e.data)},function(o){console.log("Promise list of images failed.")}),o.promise}function u(){s().then(function(e){o.images=e,a()})}u(),o.delete=function(o){t.delete("/api/images/"+o.target.id).success(function(o){console.log("Successfully deleted!"),u()})},o.uploadFiles=function(e,t){o.files=e,o.errFiles=t,angular.forEach(e,function(e){e.upload=c.upload({url:"/api/images/",data:{file:e,category:o.selCat}}),e.upload.then(function(e){e.status>0&&(o.errorMsg=e.status+": "+e.data)},function(o){e.progress=Math.min(100,parseInt(100*o.loaded/o.total))})}),u()},o.addCat=function(e){o.categories.push(e),o.newCat="",o.selCat=e}}])}(),function(){"use strict";angular.module("app").controller("login_controller",["$scope","$state","$http","$log","$cookieStore",function(o,e,t,r,l){o.login=function(r){t.post("/users/login",r).success(function(o,t){console.log("success"),l.put("auth",!0),e.go("home")}).error(function(e,t,r,l,n){console.log("Error: "+e),console.log(l),o.error=!0})}}])}(),function(){"use strict";angular.module("app").controller("logout_controller",["$scope","$rootScope","$log","$cookieStore",function(o,e,t,r){o.logout=function(){e.auth=!1,r.put("auth",!1)}}])}(),function(){"use strict";angular.module("app").controller("register_controller",["$scope","$state","$http","$log",function(o,e,t,r){console.log("Register controller loaded"),o.register=function(r){t.post("/users/register",r).success(function(o,t){console.log("success"),e.go("login")}).error(function(e,t,r,l,n){console.log("Error: "+e),console.log(l),o.error=!0})}}])}(),function(){"use strict";angular.module("app").controller("user_controller",["$scope","$rootScope","$state","$http","$log","$cookieStore","Upload",function(o,e,t,r,l,n,c){o.refresh=function(){r.get("/users").success(function(e){o.users=e})},r.get("/users").success(function(e){o.users=e})}])}(),angular.module("app").directive("bookingCalendar",function(){return{restrict:"E",template:"<div>This is the Booking Calendar.</div>"}}),angular.module("app").directive("currentBooking",function(){return{restrict:"E",template:"<div>These are the Current Bookings.</div>"}}),angular.module("app").directive("pendingBooking",function(){return{restrict:"E",template:"<div>These are the Pending Bookings.</div>"}}),function(){"use strict";angular.module("app").config(["$stateProvider","$urlRouterProvider",function(o,e){e.otherwise("/home"),o.state("login",{url:"/",templateUrl:"login.html",controller:"login_controller",resolve:{load:["$q","$cookieStore",function(o,e){var t=o.defer();return e.get("auth")?t.reject():t.resolve(),t.promise}]}}).state("home",{url:"/home",templateUrl:"home.html",controller:"home_controller",resolve:{load:["$q","$cookieStore",function(o,e){var t=o.defer();return e.get("auth")?t.resolve():t.reject(),t.promise}]}}).state("contact",{url:"/contact",templateUrl:"contact.html",controller:"contact_controller"}).state("booking",{url:"/booking",templateUrl:"booking.html",controller:"booking_controller"}).state("about",{url:"/about",templateUrl:"about.html",controller:"about_controller"}).state("register",{url:"/register",templateUrl:"register.html",controller:"register_controller"}).state("image",{url:"/imagemanager",templateUrl:"imageUpload.html",controller:"image_controller",resolve:{load:["$q","$cookieStore",function(o,e){var t=o.defer();return e.get("auth")?t.resolve():t.reject(),t.promise}]}}).state("user",{url:"/usermanager",templateUrl:"users.html",controller:"user_controller",resolve:{load:["$q","$cookieStore",function(o,e){var t=o.defer();return e.get("auth")?t.resolve():t.reject(),t.promise}]}})}])}();