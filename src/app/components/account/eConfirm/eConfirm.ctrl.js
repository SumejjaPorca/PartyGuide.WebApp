(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('eConfirmCtrl', eConfirmCtrl);

	/**@ngInject */
	function eConfirmCtrl($stateParams, accountService, toastr, $state, $timeout){

    accountService.confirmEmail($stateParams.code).then(function(){

				toastr.success("Confirmation succesful.");

				$timeout(function(){
					$state.go('home');
				}, 1500);
        
			}, function(response){

				toastr.error('Confirmation failed.');

			});


	}

})();
