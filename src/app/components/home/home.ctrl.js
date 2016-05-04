
(function(){
	"use strict";

	angular
		.module('pg')
		.controller('HomeCtrl', homeCtrl);

		/** @ngInject */
		function homeCtrl($scope, accountService, $state, toastr, barsService){

			 $scope.bars = [];
			 barsService.get().then(
				function(bars){
					var bars = bars.data;
		      angular.copy(bars, $scope.bars);
		    }
			);

    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };

            $scope.go = function(state, params){
                $state.go(state, params)
            };

		}
})();
