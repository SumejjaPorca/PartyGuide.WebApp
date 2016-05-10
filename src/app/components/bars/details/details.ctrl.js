(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barDetailsCtrl', detailsCtrl);

	/**@ngInject */
	function detailsCtrl($scope, accountService, $state, $stateParams, barsService){

    $scope.bar = {name:"", location:{address:""}, tags: []};
		$scope.showMap = false;

		var mapProp = {
				center: { Lat: 43.9000, Lng: 17.4 },
				zoom: 7
		};
		//$scope.map = geolocation.instantiateMap("map", mapProp);

    barsService.getDetailed($stateParams.id).then(
				function(bar){
				angular.copy(bar, $scope.bar);
				//$scope.Marker = new geolocation.Marker($scope.map, { lat: $scope.bar.Loc.Lat, lng: $scope.Loc.Long });
				//$scope.map.panTo($scope.Marker.getPosition());
		}, function(error){
				$scope.message = error.data.message;
		});

     $scope.isLoggedIn = function(){
         return accountService.isLoggedIn();
     };

     $scope.go = function(state, params){
         $state.go(state, params)
     };

		 $scope.isAdmin = function(){
			 var user = accountService.getCurrentUser();
			 if(!user) return false;

			 user = user.user;
			 if(!user) return false;

			 var adminOf = user.adminOf;

			 for(var i in adminOf)
			 {
				 if(adminOf[i] == $scope.bar._id)
				 	return true;
			 }
			 return false;
		 }
	}

})();
