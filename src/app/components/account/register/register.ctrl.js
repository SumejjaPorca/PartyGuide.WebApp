(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('RegisterCtrl', registerCtrl);

	/**@ngInject */
	function registerCtrl($scope, accountService, toastr, $state, $timeout, $translate){

		init();

		$scope.errors = [];
		$scope.register = function(){

			angular.copy([], $scope.errors);

			if($scope.rForm.$invalid){
				$translate(['REG.CHECK_FIELDS','REG.INVALID_FORM']).then(function(trans){
					toastr.error(trans['REG.CHECK_FIELDS'], trans['REG.INVALID_FORM']);
				}).catch(function(err){
					console.log(err);
				});

				$scope.rForm.username.$setTouched();
				$scope.rForm.email.$setTouched();
				$scope.rForm.password.$setTouched();
				$scope.rForm.confirmPassword.$setTouched();

				return;
			}

			accountService.register($scope.newUser).then(function(){
				// tek poslije ovog je mijenjano. ova success poruka, i hendlanje errora
				$translate(['REG.MAIL_SENT','REG.REG_SUCCESSFUL']).then(function(trans){
					toastr.error(trans['REG.MAIL_SENT'], trans['REG.REG_SUCCESSFUL']);
				}).catch(function(err){
					console.log(err);
				});

				$timeout(function(){
					$state.go('login');
				}, 1500);

			}, function(response){
				if(response.data.username){
					switch (response.data.username) {
						case "exists":
							$translate('REG.USERNAME_EXISTS').then(function(trans){$scope.errors.push(trans);})
							break;

						case "required":
							$translate('REG.USERNAME_REQ').then(function(trans){$scope.errors.push(trans);})
							break;

						case "minlength":
							$translate('REG.USERNAME_SHORT').then(function(trans){$scope.errors.push(trans);})
							break;
					}

				}
				if(response.data.email){
					switch (response.data.email) {
						case "exists":
							break;
							$translate('REG.EMAIL_EXISTS').then(function(trans){$scope.errors.push(trans);})

						case "not valid":
							$translate('REG.EMAIL_NOT_WALID').then(function(trans){$scope.errors.push(trans);})
							break;
					}
				}

				if(response.data.password){
					switch (response.data.password) {
						case "required":
							$translate('REG.PASS_REQ').then(function(trans){$scope.errors.push(trans);})
							break;
						case "weak":
							$translate('REG.PASS_WEAK').then(function(trans){$scope.errors.push(trans);})
							break;
					}
				}
				$translate('REG.REG_ERR').then(function(trans){
					toastr.error(trans);
				});

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
