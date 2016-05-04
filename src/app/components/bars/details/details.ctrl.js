(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barDetailsCtrl', detailsCtrl);

	/**@ngInject */
	function detailsCtrl($scope, accountService, $state, $stateParams, barsService){

    $scope.bar = {name:"", location:{address:""}, tags: []}
    barsService.getDetailed($stateParams.id).then(
     function(bar){
       $scope.bar = bar.data;
     }, function(error){
       $scope.message = error.data.message;
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
