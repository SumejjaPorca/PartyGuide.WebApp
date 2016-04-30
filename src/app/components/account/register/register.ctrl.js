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
				if(response.data.username)
					$scope.errors.push("Username: " + response.data.username);

				if(response.data.email)
					$scope.errors.push("Email: " + response.data.email);

				if(response.data.password)
					$scope.errors.push("Password: " + response.data.password);

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
