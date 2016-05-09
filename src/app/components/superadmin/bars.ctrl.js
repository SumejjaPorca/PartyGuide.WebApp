(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('SuperadminBarsCtrl', superadminBarsCtrl);

	/**@ngInject */
	function superadminBarsCtrl($scope, accountService, toastr, $state, barsService){

    $scope.bars = [];
    $scope.error = "";

    barsService.get().then(function(bars){
      angular.copy(bars, $scope.bars);
    });

		$scope.removeBar = function(bar){
			barsService.delete(bar._id)
			.then(function(response){
				toastr.success("Bar removed.");
				for(var i = 0; i < $scope.bars.length; i++){
					if($scope.bars[i]._id == bar._id){
						$scope.bars.splice(i,1);
					}
				}
			}).catch(function(response){
				if(response.data.id)
					toastr.error('No bar with this ID. Refresh page.');
			});
		}
	}

})();
