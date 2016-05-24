(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('SuperadminUsersCtrl', ctrl);

	/**@ngInject */
	function ctrl($scope, toastr, $state, usersService){

    $scope.users = [];
    $scope.error = "";
    $scope.search = { text:"" };

    $scope.$watch('search.text', function(newValue){
      if(newValue && newValue != ""){
        usersService.find(newValue).then(function(users){
          angular.copy(users, $scope.users);
        });

      }
      else {
        angular.copy([], $scope.users);
      }

    });


		$scope.toggleBan = function(user){
      if(user.banned){
        // unban user

        usersService.unban(user._id).then(function(){
          user.banned =  false;
        });
      } else {
        // ban user

        usersService.ban(user._id).then(function(){
          user.banned =  true;
        });
      }
		}
	}

})();
