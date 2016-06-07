(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('RequestResetPassCtrl', RequestReset);

	/**@ngInject */
	function RequestReset($scope, accountService, toastr, $state, $timeout, $translate){

		$scope.reset = { email:"" };
		$scope.errors = [];

		$scope.request = function(){

			angular.copy([], $scope.errors);

			if($scope.rForm.$invalid){
				$translate(['REG.CHECK_FIELDS','REG.INVALID_FORM']).then(function(trans){
					toastr.error(trans[0], trans[1]);
				})
				$scope.rForm.email.$setTouched();

				return;
			}

			accountService.requestreset($scope.reset.email).then(function(response){
				$translate('REG.RESET_LINK_SENT').then(function(trans){
					toastr.success(trans)
				});

				$timeout(function(){
					$state.go('login');
				}, 1500);

			}, function(error){
				if(error.data.email){
					if(error.data.email == "required")
						$translate('REG.E_REQ').then(function(trans){
								$scope.errors.push(trans);
						});

					if(error.data.email == "wrong")
						$translate('REG.E_WRONG').then(function(trans){
								$scope.errors.push(trans);
						});

				}
				$translate('REG.RES_REQ_FAIL').then(function(trans){
						toaster.error(trans);
				});

			});

		}


	}

})();
