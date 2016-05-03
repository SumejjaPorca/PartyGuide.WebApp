(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('ResetPassCtrl', ResetPass);

	/**@ngInject */
	function ResetPass($scope, $stateParams, accountService, toastr, $state, $timeout){

		//$scope.reset = { password:"", confirmPassword:"" };
		$scope.errors = [];

    $scope.resetPass = function(){
			console.log("OVDJE");
			//console.log($scope.reset.password);
      angular.copy([], $scope.errors);

      accountService.resetPass({
        token: $stateParams.code,
        password: $scope.reset.password
      }).then(function(){

				toastr.success("Password succesfuly changed.");
				$timeout(function(){
					$state.go('login');
				}, 1500);

      }, function(err){
        if(err.data.token){
          if(err.data.token == "required")
            $scope.errors.push("Reset code is required.");
          else if(err.data.token == "not valid")
            $scope.errors.push("Token is already used or not valid.");
					else if(err.data.token == "expired")
						$scope.errors.push("Token expired.");
        }

        if(err.data.password){
					switch (err.data.password) {
						case "required":
							$scope.errors.push("Password is required.");
							break;
						case "weak":
							$scope.error.push("Password is weak. Password must be minimum 8 char long, and have at least one lowercase and uppercase letter.");
							break;
					}
        }
      });
    }

	}

})();
