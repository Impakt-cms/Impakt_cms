(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', function home_controller($scope, $rootScope, $state, $http, $log, $cookieStore, Upload) {
			console.log("Home controller loaded.");
			$rootScope.auth = $cookieStore.get('auth');
			if ($rootScope.auth) console.log("Home controller loaded");
			
			$scope.submit = function() {
				upload($scope.file);
			};

			// upload on file select or drop
			function upload(file) {
				Upload.upload({
  					url: '/api/images/',
  					method: 'POST',
  					data:{name: file.name, file: file},
				}).then(function (resp) {
					$scope.data = resp.config.data.file.name;
					console.log(resp.config.data.file);
					console.log(resp.data)
					console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
				}, function (resp) {
					console.log('Error status: ' + resp.status);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			};
			// for multiple files:
			$scope.uploadFiles = function (files) {
			  if (files && files.length) {
				console.log("This is firing, upload file(s)")
				for (var i = 0; i < files.length; i++) {
					/*Upload.upload({
						url:'api/images',
						method:'POST',
						data:{file:files[i]},
						file:files

					})*/

					Upload.upload({
  					url: '/api/images/',
  					method: 'POST',
  					data:{file: files[i]},
				})

				}
				// or send them all together for HTML5 browsers:
				//Upload.upload({..., data: {file: files}, ...})...;
			  }
			};
			
        });
})();
