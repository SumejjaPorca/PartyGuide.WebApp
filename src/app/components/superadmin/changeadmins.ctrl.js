(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('ChangeAdminsCtrl', ctrl);

	/**@ngInject */
	function ctrl($scope, usersService, $stateParams, barsService,$state,$timeout){

    $scope.bar = {};
    $scope.admins = [];
    $scope.foundAdmins = [];
    $scope.adminSearch  = { text:""};

    barsService.getDetailed($stateParams.id).then(function(bar){
      angular.copy(bar,$scope.bar);
    });

    barsService.getAdmins($stateParams.id).then(function(admins){
      angular.copy(admins,$scope.admins);
    });

    $scope.$watch('adminSearch.text', function(newValue){
      if(newValue && newValue != ""){
        usersService.find(newValue).then(function(users){
          angular.copy(users,$scope.foundAdmins);
        });
      }
      else {
          angular.copy([],$scope.foundAdmins);
      }

    });


    $scope.save = function(){
        var admins = $scope.admins.map(function(admin){return admin._id;});
        barsService.changeAdmins($scope.bar._id, admins).then(function(){
          toastr.success("Successfuly changed");
          $timeout(function(){
            $state.go('superadmin.bars');
          },1000);
        })
    }

    $scope.inAdmins = function(user){
      for(var i in $scope.admins){
        if($scope.admins[i]._id == user._id)
          return true;
      }

      return false;
    }

    $scope.addAdmin = function(user){
      if(!$scope.inAdmins(user))
        $scope.admins.push(user);
    }

    $scope.removeAdmin = function(index){
      $scope.admins.splice(index,1);
    }

	}

})();
