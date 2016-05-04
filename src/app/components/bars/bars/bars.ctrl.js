(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barsCtrl', barsCtrl);

	/**@ngInject */
	function barsCtrl($scope, accountService, $state, barsService){

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
