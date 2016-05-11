(function(){
	"use strict";

	angular
		.module('pg.posts')
		.controller('PostsCreateCtrl', ctrl);

	/**@ngInject */
	function ctrl($scope, $state, $stateParams, barsService,
		toastr, $timeout, $filter, postsService){

		$scope.bar = {};
    $scope.error = "";
    $scope.post = { title:"", text:"" }

    barsService.getDetailed($stateParams.id).then(function(bar){
			// maybe $scope.apply needed
			angular.copy(bar, $scope.bar);
		});


		$scope.create = function(){

			if($scope.rForm.$invalid){
				$scope.rForm.title.$setTouched();
				$scope.rForm.text.$setTouched();

				return;
			};

			postsService.create($stateParams.id, $scope.post).then(function(response){
				toastr.success("Post created.");

				$timeout(function () {
					$state.go('bars.details',{id:$scope.bar._id});
				}, 1500);
			}).catch(function(res){
				toastr.error(res.data.message, "Posting failed")
			});
		};

	}

})();
