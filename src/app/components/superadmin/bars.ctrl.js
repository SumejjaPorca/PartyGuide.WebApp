(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('SuperadminBarsCtrl', superadminBarsCtrl);

	/**@ngInject */
	function superadminBarsCtrl($scope, accountService, toastr, $state, $http, serverName){

		// TODO use bar service
    $http.get(serverName + '/api/bars').then(function(bars){
			var bars = bars.data;
      angular.copy(bars, $scope.bars);
    });



    $scope.bars = [];
    $scope.error = "";

		$scope.removeBar = function(bar){
			$http.delete(serverName + '/api/bars/' + bar._id)
			.then(function(response){
				toastr.success("Bar removed.");
				for(var i = 0; i < $scope.bars.length; i++){
					if($scope.bars[i]._id == bar._id){
						$scope.bars.splice(i,1);
					}
				}
			}).catch(function(response){

			});
		}
	}

})();
