(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barsListCtrl', barsCtrl);

	/**@ngInject */
	function barsCtrl($scope, accountService, $state, barsService, $log, $timeout, geolocation){

		$scope.bars = [];

		$scope.search = {
			name: "",
			coords : {latitude:43.9000, longitude:17.4},
			address: ""
		};

		var mapProp = { center: $scope.search.coords, zoom: 10 };

		$scope.map = mapProp;

		$scope.searchbox = {
          template:'app/components/bars/list/searchbox.tpl.html',
          events:{
            places_changed: function (searchBox) {

							$timeout(function () {
								geolocation.getLatLng($scope.search.address).then(function(response){
									var coords = response;
									$scope.marker.coords.latitude = coords.lat();
									$scope.marker.coords.longitude = coords.lng();
									$scope.map.center = $scope.marker.coords;
									$scope.marker.options = {
										draggable: true,
										labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
										labelAnchor: "100 0",
										labelClass: "marker-labels"
									};
								});

					    }, 500);
						}
          },
					parentdiv: 'searchbox'
        };



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
					geolocation.getAddress(lat, lon).then(function(address){
						$scope.search.address = address;
					});
					$scope.marker.options = {
						draggable: true,
						labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			}
		};



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
