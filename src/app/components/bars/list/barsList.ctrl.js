(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barsListCtrl', barsCtrl);

	/**@ngInject */
	function barsCtrl($scope, accountService, $state, barsService, $log, $timeout){

		$scope.bars = [];

		$scope.search = {
			name: "",
			coords : {latitude:43.9000, longitude:17.4}
		};

		var mapProp = { center: $scope.search.coords, zoom: 8 };

		$scope.map = mapProp;

		$scope.marker = {
			id: 0,
			coords: $scope.search.coords,
			options: { draggable: true },
			events: {
				dragend: function (marker, eventName, args) {
					$log.log('marker dragend');
					var lat = marker.getPosition().lat();
					var lon = marker.getPosition().lng();
					$scope.search.longitude = lon;
					$scope.search.latitude = lat;
					$log.log(lat);
					$log.log(lon);
					$scope.marker.options = {
						draggable: true,
						labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			}
		};

		$scope.$watchCollection("search.longitude", function (newVal, oldVal) {
		if (_.isEqual(newVal, oldVal))
			return;
			$timeout(function () {
				$scope.marker.coords.longitude = newVal;
				$scope.map.center = $scope.marker.coords;
			}, 5000);
		});

		$scope.$watchCollection("search.latitude", function (newVal, oldVal) {
			if (_.isEqual(newVal, oldVal))
			return;
			$timeout(function () {
				$scope.marker.coords.latitude = newVal;
				$scope.map.center = $scope.marker.coords;
			}, 5000);
		});



		$scope.getAll = function(){
			barsService.get().then(function(bars) {
				angular.copy(bars, $scope.bars);
			});
		}
		$scope.isLoggedIn = function(){
			return accountService.isLoggedIn();
		};

		$scope.go = function(state, params){
			$state.go(state, params)
		};

		$scope.searchName = function(){
			if($scope.search.name == ""){ // get all
				$scope.getAll();
			}
			else {
				barsService.searchByName($scope.search.name).then(function(bars){
					angular.copy(bars, $scope.bars);
				});
			}
		}
		$scope.searchNear = function(){
			barsService.searchNear($scope.search.latitude, $scope.search.longitude).then(function(bars){
					angular.copy(bars, $scope.bars);
				});
		}


		$scope.getAll();
	}

})();
