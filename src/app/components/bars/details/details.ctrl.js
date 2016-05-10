(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barDetailsCtrl', detailsCtrl);

	/**@ngInject */
	function detailsCtrl($scope, accountService, $state, $stateParams, barsService){

    $scope.bar = {name:"", location:{address:""}, tags: []};
		$scope.showMap = false;

		var mapProp = { center: { latitude:43.9000, longitude: 17.4 }, zoom: 8 };

		$scope.map = mapProp;
		
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

	}

})();
