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

      this.create = function(barId, reviewModel){
        reviewModel.barId = barId;
        return $http.post(serverName + '/api/reviews', reviewModel);
      };

      this.getStats = function(){
        return $http({
          url: serverName + '/api/reviews/statistics',
          method: "GET"
        });
      };

  }
})();
