
(function(){
	"use strict";

	angular
		.module('pg')
		.controller('HomeCtrl', homeCtrl);

		/** @ngInject */
		function homeCtrl($scope, accountService, $state, toastr){

			$scope.clubs = [];
			            
    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };

            $scope.go = function(state, params){
                $state.go(state, params)
            };

		}
})();
