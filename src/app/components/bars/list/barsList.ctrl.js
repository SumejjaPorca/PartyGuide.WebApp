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

		var mapProp = { center: $scope.search.coords, zoom: 10, bounds: {} };

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
									$scope.markers[0].latitude = coords.lat();
									$scope.markers[0].longitude = coords.lng();

									$scope.search.coords.longitude = coords.lng();
									$scope.search.coords.latitude = coords.lat();

									$scope.map.center = $scope.markers[0].coords;
									$scope.markers[0].options = {
										draggable: true,
										labelContent: "lat: " + $scope.markers[0].latitude + ' ' + 'lon: ' + $scope.markers[0].longitude,
										labelAnchor: "100 0",
										labelClass: "marker-labels"
									};
								});

					    }, 500);
						}
          },
					parentdiv: 'searchbox'
        };


		$scope.events = {dragend: function(marker, eventName, args){
			$log.log('marker dragend');
			$log.log(marker);
			if(marker.key == 0){
				$log.log('marker dragend 2');
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();
				$scope.search.coords.longitude = lon;
				$scope.search.coords.latitude = lat;
				geolocation.getAddress(lat, lon).then(function(address){
					$scope.search.address = address;
				});
				marker.options = {
					draggable: true,
					labelContent: "lat: " + lat + ' ' + 'lon: ' + lon,
					labelAnchor: "100 0",
					labelClass: "marker-labels"
				};
			}
		}}

		$scope.markers = [{
			latitude: $scope.search.coords.latitude,
			longitude: $scope.search.coords.longitude,
			title: 'm0',
			id: 0,
			options: { draggable: true }
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
			barsService.searchNear($scope.search.coords.longitude, $scope.search.coords.latitude).then(function(bars){
					angular.copy(bars, $scope.bars);
					$scope.bars.forEach(function(item, index){
						$scope.markers.push(createRandomMarker(index + 1, item.location.geo[0], item.location.geo[1], item.name));
					}
				);
				});
		}

		var createRandomMarker = function(i, longitude, latitude, label) {

		      var ret = {
		        longitude: longitude,
		        latitude: latitude,
		        title: 'm' + i,
						id: i,
						options: {
							draggable: false,
							labelContent: label,
							labelAnchor: "100 0",
							labelClass: "marker-labels"}
		      };

		      return ret;
		    };

		$scope.getAll();
	}

})();
