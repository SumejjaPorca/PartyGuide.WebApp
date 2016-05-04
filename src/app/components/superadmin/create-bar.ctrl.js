(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('CreateBarCtrl', createBarCtrl);

	/**@ngInject */
	function createBarCtrl($scope, accountService, toastr, $timeout, $state, $http, serverName){



    $scope.bar = {
			name:"",
			description:"",
			location:{
				address:"",
				geo:["",""]
			}
		};
    $scope.error = "";

		$scope.create = function(){
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

			$http({
				url: serverName + '/api/bars',
				method: 'POST',
				data: $scope.bar
			}).then(function(response){
				toastr.success("Bar created.");

				$timeout(function () {
					$state.go('superadmin.bars')
				}, 1500);
			}).catch(function(res){
				toastr.error(res.data.message, "Creating failed")
			})
		};
	}

})();
