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
