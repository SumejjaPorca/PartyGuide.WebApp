(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('CreateBarCtrl', createBarCtrl);

	/**@ngInject */
	function createBarCtrl($scope, accountService, toastr, $timeout, $state,
		barsService, $filter, $log, geolocation, imageService){

	    $scope.bar = {
				name:"",
				description:"",
				location:{
					address:"",
					geo:["",""]
				},
				tags:[]
			};

			// Image UPLOAD
			$scope.uploader =  imageService.changeBarUploader();
			$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
					if(response.name)
						$scope.bar.image = response.name;
	    };

			$scope.getImageSrc = function(){
				return imageService.getImageSrc($scope.bar.image);
			}
			// Image UPLOAD - END


			$scope.coords = {latitude:43.9000, longitude:17.4};

			var mapProp = { center: $scope.coords, zoom: 10 };

			$scope.map = mapProp;

					$scope.map = mapProp;

					$scope.searchbox = {
			          template:'app/components/superadmin/searchbox.tpl.html',
			          events:{
			            places_changed: function (searchBox) {
											$timeout(function () {
												geolocation.getLatLng($scope.bar.location.address).then(function(response){
													var coords = response;
													$scope.marker.coords.latitude = coords.lat();
													$scope.marker.coords.longitude = coords.lng();
													$scope.bar.location.geo[0] = coords.lng();
													$scope.bar.location.geo[1] = coords.lat();
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
								parentdiv:'searchbox'
			        };

			$scope.marker = {
				id: 0,
				coords: $scope.coords,
				options: { draggable: true },
				events: {
					dragend: function (marker, eventName, args) {
						$log.log('marker dragend');
						var lat = marker.getPosition().lat();
						var lon = marker.getPosition().lng();
						geolocation.getAddress(lat, lon).then(function(address){
							$scope.bar.location.address = address;
						});
						$scope.bar.location.geo[0] = lon;
						$scope.bar.location.geo[1] = lat;
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
