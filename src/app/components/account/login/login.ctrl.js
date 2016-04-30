(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('LoginCtrl', loginCtrl);

	/**@ngInject */
	function loginCtrl($scope, accountService, toastr, $state, $timeout, vcRecaptchaService){

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


		$scope.login = function(){

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
			}, function(response){

				if(response.data.message)
					toastr.error(response.data.message, 'Login failed.');
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
											key: '6Lda3x0TAAAAAJYWCq_yhfmbDQdPl1BABVKWhfUa'
									};
		}

	}

})();
