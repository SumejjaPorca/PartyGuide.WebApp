(function(){
	"use strict";

	angular
		.module('pg.account')
		.controller('LogoutCtrl', logoutCtrl);

	/**@ngInject */
	function logoutCtrl($scope, accountService, toastr, $state, $timeout, $translate){


        accountService.logout();

				$translate('REG.LOGOUTSUC').then(function(trans){
					toastr.success(trans);

				})

        $timeout(function(){
            $state.go('home');
        }, 1500);

	}

})();
