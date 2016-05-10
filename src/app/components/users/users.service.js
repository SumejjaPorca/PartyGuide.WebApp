(function(){
"use strict";

angular
  .module('pg.users')
  .service('usersService', service);

/** @ngInject */
function service($http, serverName){

      this.find = function(usernameOrEmail){
        return $http.get(serverName + '/api/user/search/ ' + usernameOrEmail).then(function (response){return response.data;});
      };
  }

})();
