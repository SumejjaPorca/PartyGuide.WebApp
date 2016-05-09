(function(){
"use strict";

angular
  .module('pg.bars')
  .service('barsService', barsService);

/** @ngInject */
function barsService($http, serverName, $q){

      this.get = function(){
        return $http.get(serverName + '/api/bars').then(function (response){return response.data;});

      };

      this.getDetailed = function(id){
        return $http({
          url: serverName + '/api/bars/' + id,
          method: "GET"
        }).then(function(response){return response.data;});
      };

      this.delete = function(id){
        return $http.delete(serverName + '/api/bars/' + id)
      }

      this.create = function(barModel){
        return $http({
  				url: serverName + '/api/bars',
  				method: 'POST',
  				data: barModel
  			});
      }

  }
})();
