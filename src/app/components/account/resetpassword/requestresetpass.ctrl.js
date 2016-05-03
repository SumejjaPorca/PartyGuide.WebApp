(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('RequestResetPassCtrl', RequestReset);

	/**@ngInject */
	function RequestReset($scope, accountService, toastr, $state, $timeout){

		$scope.reset = { email:"" };
		$scope.errors = [];

		$scope.request = function(){

			angular.copy([], $scope.errors);

			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' );
				$scope.rForm.email.$setTouched();

				return;
			}

			accountService.requestreset($scope.reset.email).then(function(response){
				toastr.success("Reset link sent to your email.", "Check your email")

				$timeout(function(){
					$state.go('login');
				}, 1500);

			}, function(error){
				if(error.data.email){
					if(error.data.email == "required")
						$scope.errors.push("Email is required.");

					if(error.data.email == "wrong")
						$scope.errors.push("Wrong email. There is no user with this email.");
				}

				toastr.error(error.data.message, "Failed to send reset request.");
			});

		}


	}

})();
