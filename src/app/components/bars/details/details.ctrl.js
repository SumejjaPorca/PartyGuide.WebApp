(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barDetailsCtrl', detailsCtrl);

/**@ngInject */
	function detailsCtrl($scope, accountService, $state, $stateParams, barsService,
		 $log, $timeout, postsService, reviewsService, imageService){

		$scope.bar = {name:"", location:{address:""}, tags: []};

		$scope.isLoggedIn = function(){
						return accountService.isLoggedIn();
				};

	   $scope.rating = {};
	   $scope.rating.rate = 3;
		 $scope.rating.comment = '';

		 $scope.newReview = function(){

			 if($scope.rForm.$invalid){
				 $scope.rForm.title.$setTouched();
				 $scope.rForm.text.$setTouched();

				 return;
			 };

			 reviewsService.create($stateParams.id, $scope.rating).then(function(response){
				 toastr.success("Review sent.");

				 $timeout(function () {
					 $state.go('bars.details',{id:$scope.bar._id});
				 }, 1500);
			 }).catch(function(res){
				 toastr.error(res.data.message, "Sending review failed")
			 });
		 };
		// Show image
		$scope.getImageSrc = function(){
			var src = imageService.getImageSrc($scope.bar.image);

			return src;
		}
		// Show Image - end

		$scope.showMap = false;
		$scope.posts = [];
		$scope.reviews = [];
		$scope.index = 0;

		var lat = 43.9000;
		var long = 17.4;

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

    barsService.getDetailed($stateParams.id).then(
				function(bar){
				angular.copy(bar, $scope.bar);
				$scope.marker.options.labelContent = "lat: " + bar.location.geo[1] + ' ' + 'lon: ' + bar.location.geo[0];
				$scope.marker.coords.longitude = $scope.bar.location.geo[1];
				$scope.marker.coords.latitude = $scope.bar.location.geo[0];
		}, function(error){
				$scope.message = error.data.message;
		});

		postsService.getByBar($stateParams.id).then(function(posts){
			angular.copy(posts,$scope.posts);
			$scope.index = $scope.posts.length - 1;
		});

		reviewsService.getByBar($stateParams.id).then(function(reviews){
			angular.copy(reviews,$scope.reviews);
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

		$scope.Previous = function(){ //previous post
			if(!$scope.HasPrevious())
				return;
			$scope.index = $scope.index - 1;
			return true;
		}

		$scope.HasPrevious = function(){
			return $scope.index > 0;
		}

		$scope.HasNext = function(){
			if ($scope.posts != undefined)
				return $scope.index < $scope.posts.length - 1;
			else return false;
    }

    $scope.Next = function(){ //newer post
			if(!$scope.HasNext())
				return;
			$scope.index = $scope.index + 1;
      return true;
		}
	}

})();
