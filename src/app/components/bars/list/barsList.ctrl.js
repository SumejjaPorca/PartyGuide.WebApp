(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barsListCtrl', barsCtrl);

	/**@ngInject */
	function barsCtrl($scope, accountService, $state, barsService){

    $scope.bars = [];
    barsService.get().then(
     function(bars){
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
