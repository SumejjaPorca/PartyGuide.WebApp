(function(){
"use strict";

angular
  .module('pg.bars')
  .service('barsService', barsService);

/** @ngInject */
function barsService($http, serverName, $q){

      this.get = function(){
        return $http.get(serverName + '/api/bars');

      };

      this.getDetailed = function(id){
        return $http({
          url: serverName + '/api/bars/' + id,
          method: "GET"
        });
      };


  }
})();
