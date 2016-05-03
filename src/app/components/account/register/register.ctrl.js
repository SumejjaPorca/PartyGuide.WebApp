(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('RegisterCtrl', registerCtrl);

	/**@ngInject */
	function registerCtrl($scope, accountService, toastr, $state, $timeout){

		init();

		$scope.errors = [];

		$scope.register = function(){

			angular.copy([], $scope.errors);

			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' );
				$scope.rForm.username.$setTouched();
				$scope.rForm.email.$setTouched();
				$scope.rForm.password.$setTouched();
				$scope.rForm.confirmPassword.$setTouched();

				return;
			}

			accountService.register($scope.newUser).then(function(){
				// tek poslije ovog je mijenjano. ova success poruka, i hendlanje errora
				toastr.success("Confirmation mail was sent to you", "Succesful registration.");

				$timeout(function(){
					$state.go('login');
				}, 1500);

			}, function(response){
				if(response.data.username){
					switch (response.data.username) {
						case "exists":
							$scope.errors.push("Username already exists.");
							break;

						case "required":
							$scope.errors.push("Username is required.");
							break;

						case "minlength":
							$scope.errors.push("Username is short. Minimal length is 6.");
							break;
					}

				}
				if(response.data.email){
					switch (response.data.email) {
						case "exists":
							$scope.errors.push("Email already exists.");
							break;

						case "not valid":
							$scope.errors.push("Email's format isn't valid.");
							break;
					}
				}

				if(response.data.password){
					switch (response.data.password) {
						case "required":
							$scope.errors.push("Password is required.");
							break;
						case "weak":
							$scope.error.push("Password is weak. Password must be minimum 8 char long, and have at least one lowercase and uppercase letter.");
							break;
					}
				}
				toastr.error(response.data.message,"Registration error.");
			});
		};

		function init(){
			$scope.newUser = {
				username : "",
				password : "",
				confirmPassword : "",
				email : ""
			};
		}
	}

})();
