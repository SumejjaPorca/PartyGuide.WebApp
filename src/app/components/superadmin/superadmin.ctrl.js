(function(){
	"use strict";

	angular
		.module('pg.superadmin')
		.controller('SuperadminCtrl', superadminCtrl);

	/**@ngInject */
	function superadminCtrl($scope, accountService, toastr, $state, $http, serverName){

		var user = accountService.getCurrentUser().user;
		if(!user || !user.superadmin){
			$state.go('home');
		}

	}

})();
