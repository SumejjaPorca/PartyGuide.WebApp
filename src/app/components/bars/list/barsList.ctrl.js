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
			tags:"",
			address: ""
		};

		var mapProp = { center: $scope.search.coords, zoom: 10 };

		$scope.map = mapProp;

		$scope.searchbox = {
          template:'app/components/bars/list/searchbox.tpl.html',
          events:{
            places_changed: function (searchBox) {

							$timeout(function () {
								console.log('places_changed');
								geolocation.getLatLng($scope.search.address).then(function(response){
									var coords = response;
									console.log(coords);
									$scope.markers[0].coords.latitude = coords.lat();
									$scope.markers[0].coords.longitude = coords.lng();

									$scope.search.coords.longitude = coords.lng();
									$scope.search.coords.latitude = coords.lat();

									$scope.map.center = $scope.markers[0].coords;
									$scope.markers[0].options = {
										draggable: true,
										labelContent: "lat: " + $scope.markers[0].coords.latitude + ' ' + 'lon: ' + $scope.markers[0].coords.longitude,
										labelAnchor: "100 0",
										labelClass: "marker-labels"
									};
								});

					    }, 500);
						}
          },
					parentdiv: 'searchbox'
        };



		$scope.markers = [{
			id: 0,
			coords: $scope.search.coords,
			options: { draggable: true },
			events: {
				dragend: function (marker, eventName, args) {
					$log.log('marker dragend');
					var lat = marker.getPosition().lat();
					var lon = marker.getPosition().lng();
					$scope.search.coords.longitude = lon;
					$scope.search.coords.latitude = lat;
					geolocation.getAddress(lat, lon).then(function(address){
						$scope.search.address = address;
					});
					$scope.markers[0].options = {
						draggable: true,
						labelContent: "lat: " + $scope.markers[0].coords.latitude + ' ' + 'lon: ' + $scope.markers[0].coords.longitude,
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			}
		}];



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


		$scope.searchTags = function(){
			if($scope.search.tags == ""){ // get all
				$scope.getAll();
			}
			else {
				var tags = $scope.search.tags.split(" ");
				console.log(tags);
				barsService.searchByTags(tags).then(function(bars){
					angular.copy(bars, $scope.bars);
				});
			}
		}

		$scope.searchNear = function(){
			$scope.markers.splice(1, $scope.markers.length - 1);
			barsService.searchNear($scope.search.coords.latitude, $scope.search.coords.longitude).then(function(bars){
					angular.copy(bars, $scope.bars);
					$scope.bars.forEach(function(item, index){

							$scope.markers.push({
								id: index + 1,
								coords: {latitude:item.location.geo[1], longitude:item.location.geo[0]},
								options: { draggable: false },
								events: {}
							});
					}
					);
				});
		}


		$scope.getAll();
	}

})();
