(function(){
"use strict";

angular
  .module('pg.posts')
  .service('postsService', service);

/** @ngInject */
function service($http, serverName, $q){

      this.getByBar = function(barId){
        return $http.get(serverName + '/api/bars/' + barId + '/posts')
        .then(function (response) {
          return response.data;
        });

      };

      this.create = function(barId, postModel){
        postModel.barId = barId;
        return $http.post(serverName + '/api/posts', postModel);

      };


      this.getStats = function(){
        return $http({
          url: serverName + '/api/posts/statistics',
          method: "GET"
        });
      };
  }
})();
