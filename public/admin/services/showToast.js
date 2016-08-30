(function() {
    'use strict';

    angular
        .module('app')
        .service('showToast', function($mdToast){

            var showToast = function(text, delay){
              $mdToast.show(
                $mdToast.simple()
                  .textContent(text)
                  .hideDelay(delay)
              );
            }

            return showToast;

        });

})();
