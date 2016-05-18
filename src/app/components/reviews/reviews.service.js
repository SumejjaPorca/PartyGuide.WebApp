(function(){
"use strict";

angular
  .module('pg.reviews')
  .service('reviewsService', service);

/** @ngInject */
function service($http, serverName, $q){

      this.getByBar = function(barId){
        return $http.get(serverName + '/api/bars/' + barId + '/reviews')
        .then(function (response) {
          return response.data;
        });

      };

  }
})();
