(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('CreateBarCtrl', createBarCtrl);

	/**@ngInject */
	function createBarCtrl($scope, accountService, toastr, $timeout, $state,
		barsService, $filter){

			    $scope.bar = {
						name:"",
						description:"",
						location:{
							address:"",
							geo:["",""]
						},
						tags:[]
					};

			$scope.coords = {latitude:43.9000, longitude:17.4};

			$scope.$watchCollection("bar.location.geo[0]", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coords.longitude = newVal;
    });

			$scope.$watchCollection("bar.location.geo[1]", function (newVal, oldVal) {
				if (_.isEqual(newVal, oldVal))
				return;
				$scope.coords.latitude = newVal;
			});

			var mapProp = { center: { latitude:lat, longitude: long }, zoom: 8 };

			$scope.map = mapProp;

			$scope.marker = {
				id: 0,
				coords: {
					latitude: lat,
					longitude: long
				},
				options: { draggable: true },
				events: {
					dragend: function (marker, eventName, args) {
						$log.log('marker dragend');
						var lat = marker.getPosition().lat();
						var lon = marker.getPosition().lng();
						$scope.bar.location.address = ""; //for now
						$scope.bar.geo = [lat,lon];
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


    $scope.error = "";
		$scope.newTag = "";

		var stopPropagation = false;

		$scope.create = function(){

			if(stopPropagation == true){
				stopPropagation = false;
				return;
			}

			if($scope.rForm.$invalid){
				$scope.rForm.name.$setTouched();
				$scope.rForm.description.$setTouched();
				$scope.rForm.phone.$setTouched();
				$scope.rForm.address.$setTouched();
				$scope.rForm.latitude.$setTouched();
				$scope.rForm.longitude.$setTouched();

				return;
			};
			console.log($scope.bar);

			barsService.create($scope.bar).then(function(response){
				toastr.success("Bar created.");
				$timeout(function () {
					$state.go('superadmin.bars')
				}, 1500);
			}).catch(function(res){
				toastr.error(res.data.message, "Creating failed")
			})
		};

		$scope.$watch('newTag', function() {
	        $scope.newTag = $scope.newTag.toLowerCase().replace(/\s+/g,'');
	  });

		$scope.addTag = function(){
			if($scope.newTag && $scope.newTag.length > 0){
				for(var i in $scope.bar.tags){
					if($scope.bar.tags[i] == $scope.newTag){
						toastr.error("Tag already exists");
						return;
					}
				}

				$scope.bar.tags.push($scope.newTag);
				$scope.newTag = "";
			}
		}

		$scope.addTagKey = function(keyEvent) {
		  if (keyEvent.which === 13){
		    $scope.addTag();
				stopPropagation = true;

			}


		}

		$scope.removeTag = function(index){
			$scope.bar.tags.splice(index,1);
		}
	}

})();
