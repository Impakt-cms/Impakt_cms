(function() {
    'use strict';

    angular
        .module('app')
        .controller('user_controller', function user_controller($scope, $state, $http, $log, $mdDialog, showToast) {

            $scope.openMenu = function($mdOpenMenu, e) {
                $mdOpenMenu(e);
            }

            $scope.setRole = function(user, role) {
                user.role = role;
                $http({
                    method: 'PUT',
                    url: '/users/display/' + user._id,
                    data: user,
                }).success(function() {
                    showToast(user.username + ' role changed to ' + user.role, 1000);
                    getUsers();
                });
            }

            $http.get('/users').success(function(data) {
                $scope.users = data;
            });

            $scope.delete = function(event) {
                $http.delete('/users/display/' + event.target.id)
                    .success(function(res) {
                        console.log("Successfully deleted!");
                    });
                getUsers();
            };

            function getUsers() {

                $http.get('/users').success(function(data) {
                    $scope.users = data;
                });
            }


        });
})();
