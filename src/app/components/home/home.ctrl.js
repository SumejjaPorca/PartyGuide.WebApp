
(function(){
	"use strict";

	angular
		.module('pg')
		.controller('HomeCtrl', homeCtrl);

		/** @ngInject */
		function homeCtrl($scope, accountService, $state, toastr, barsService, reviewsService){

		accountService.getStats().then(function(response){
				$scope.main.data[0] = response.data.count;
		}
		);
		barsService.getStats().then(function(response){
				$scope.main.data[1] = response.data.count;
		}
		);
		reviewsService.getStats().then(function(response){
				$scope.main.data[2] = response.data.count;
		}
		);

    $scope.main = {
			labels : ["Users", "Bars", "Reviews"],
	    data : [0, 0, 0],
	    type : 'Pie'

		};

    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };

            $scope.go = function(state, params){
                $state.go(state, params)
            };




		}
})();
