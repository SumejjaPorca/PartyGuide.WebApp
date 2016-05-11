(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('BarChangeCtrl', ctrl);

	/**@ngInject */
	function ctrl($scope, accountService, $state, $stateParams, barsService,
		toastr, $timeout, $filter){

		$scope.bar = {};

		barsService.getDetailed($stateParams.id).then(function(bar){
			// maybe $scope.apply needed
			angular.copy(bar, $scope.bar);
		});


		$scope.error = "";
		$scope.newTag = "";
		var stopPropagation = false;
		$scope.save = function(){

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

			barsService.change($scope.bar).then(function(response){
				toastr.success("Bar changed.");

				$timeout(function () {
					$state.go('bars.details',{id:$scope.bar._id});
				}, 1500);
			}).catch(function(res){
				toastr.error(res.data.message, "Changing failed")
			});
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
