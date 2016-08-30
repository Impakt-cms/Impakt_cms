(function() {
    'use strict';

    angular
        .module('app')
        .service('getPromise', function($http, $q, $log){

            var getPromise = function(route){
              var deferred = $q.defer();
              $http.get(route).then(
                  function handleSuccess(response) {
                      console.log('Got promise from ' + route);
                      deferred.resolve(response.data);
                  },
                  function handleError(response) {
                      console.log('Promise list failed from ' + route);
                  });
              return deferred.promise;
            }

            return getPromise;

        });

})();
