(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('SuperadminCtrl', superadminCtrl);

	/**@ngInject */
	function superadminCtrl($scope, accountService, toastr, $state, $http, serverName){

    // TODO use bar service
    $http.get(serverName + '/api/bars').then(function(bars){
			var bars = bars.data;
      angular.copy(bars, $scope.bars);
    });

    $scope.bars = [];
    $scope.error = ""

	}

})();
