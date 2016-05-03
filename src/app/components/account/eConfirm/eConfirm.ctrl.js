(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('eConfirmCtrl', eConfirmCtrl);

	/**@ngInject */
	function eConfirmCtrl($scope, $stateParams, accountService, toastr, $state, $timeout){

		$scope.confirmation = {success:false};
		$scope.errors = ""
    accountService.confirmEmail($stateParams.code).then(function(){

				toastr.success("Confirmation succesful.");
				$scope.confirmation.success = true;

				$timeout(function(){
					$state.go('login');
				}, 2500);

			}, function(response){

				if(response.data.token == "not valid"){
					$scope.error = "Token expired or not valid.";
				}

				if(response.data.token == "expired"){
					$scope.error = "Token expired or not valid.";
				}

				toastr.error('Confirmation failed.');

			});


	}

})();
