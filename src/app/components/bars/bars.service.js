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
      this.searchNear = function(lat, long){
        return $http({
          url: serverName + '/api/bars/near?lat=' + lat.toString() + '?long=' + long.toString(),
          method: "GET"
        }).then(function(response){return response.data;});
      };

      this.getAdmins = function(id){
        return $http({
          url: serverName + '/api/bars/' + id + '/admins',
          method: "GET"
        }).then(function(response){return response.data;});
      }

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

      this.change = function(barModel){
        return $http({
  				url: serverName + '/api/bars/' + barModel._id || barModel.id,
  				method: 'PUT',
  				data: barModel
  			});
      }

      this.changeAdmins = function(barId, adminsIds){
        return $http({
  				url: serverName + '/api/bars/' + barId + '/admins',
  				method: 'PUT',
  				data: adminsIds
  			});
      }

      this.searchByTags = function(tags){
        return $http({
          url: serverName + '/api/bars/bytags',
          method: "POST",
          data:{tags:tags}
        }).then(function(response){ return response.data; });
      }

      this.searchByName = function(name){
        return $http({
          url: serverName + '/api/bars/byName/' + name,
          method: "GET"
        }).then(function(response){ return response.data; });
      }
  }
})();
