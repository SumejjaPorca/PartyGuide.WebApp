(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('eConfirmCtrl', eConfirmCtrl);

	/**@ngInject */
	function eConfirmCtrl($scope, $stateParams, accountService, toastr, $state,
												$timeout, $translate){

		$scope.confirmation = {success:false};
		$scope.errors = ""
    accountService.confirmEmail($stateParams.code).then(function(){

				$translate("ECONF.SUCCESS").then(function(trans){
					toastr.success(trans);
				})

				$scope.confirmation.success = true;

				$timeout(function(){
					$state.go('login');
				}, 2500);

			}, function(response){


				if(response.data.token == "not valid"){
					$translate("ECONF.TNVALID").then(function(trans){
							$scope.error = trans;
					})
				}

				if(response.data.token == "expired"){
					$translate("ECONF.TEXPIREDS").then(function(trans){
							$scope.error = trans;
					})
				}

				$translate("ECONF.ERROR").then(function(trans){
					toastr.error(trans);
				})

			});


	}

})();
