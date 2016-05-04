(function(){
	"use strict";

	angular
		.module('pg.superadmin')
			.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider, $httpProvider) {
		$stateProvider
			.state('superadmin', {
								url: '/superadmin',
								templateUrl: 'app/components/superadmin/superadmin.tmpl.html',
								controller: 'SuperadminCtrl'
						});
	}
})();
