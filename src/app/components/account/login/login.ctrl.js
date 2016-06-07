(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('LoginCtrl', loginCtrl);

	/**@ngInject */
	function loginCtrl($scope, accountService, toastr, $state, $timeout,
		$translate, vcRecaptchaService){

		init();
    $scope.setResponse = function (response) {
                    console.info('Response available');
                    $scope.response = response;
                };

		$scope.setWidgetId = function (widgetId) {
                    console.info('Created widget ID: %s', widgetId);
                    $scope.widgetId = widgetId;
                };

		$scope.cbExpiration = function() {
                    console.info('Captcha expired. Resetting response object');
                    vcRecaptchaService.reload($scope.widgetId);
                    $scope.response = null;
                 };

		$scope.errors = [];
		$scope.login = function(){

			angular.copy([], $scope.errors);
      //recaptcha validation
			var valid;
			if (valid) {
					console.log('Success');
			} else {
					console.log('Failed validation');
					// In case of a failed validation you need to reload the captcha
					// because each response can be checked just once
					vcRecaptchaService.reload($scope.widgetId);
			}
			//recaptcha validation end

			if($scope.rForm.$invalid){

				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
				$scope.rForm.username.$setTouched();
				$scope.rForm.password.$setTouched();
				return;
			};

			accountService.login($scope.loginModel).then(function(){

				toastr.success("Login succesful.");

				$timeout(function(){
					$state.go('home');
				}, 1500);

			}).catch(function(response){

				if(response.data.username){
					if(response.data.username == "wrong"){
						$scope.errors.push("Username or password is wrong.");
					}
					if(response.data.username == "required"){
						$scope.errors.push("Username is required.");
					}
				}
				if(response.data.password){
					if(response.data.username == "required"){
						$scope.errors.push("Username is required.");
					}
				}
				if(response.data.email){
					if(response.data.email == "not confirmed"){
						$scope.errors.push("Email isn't confirmed.");
					}
				}
				if(response.data.banned){
					$scope.errors.push("You are banned.");
				}
				if($scope.errors.length > 0)
					toastr.error($scope.errors.join(' '), 'Login failed.');
				else
					toastr.error('Login failed.');

			});

		};


		function init(){
			$scope.loginModel = {
				username : "",
				password : ""
			};
			$scope.response = null;
			$scope.widgetId = null;
			$scope.model = {
											key: '6LeifCETAAAAADgllqdtdvv2Ej-i7r56QcweVyek'
									};
		}

	}

})();
