(function(){
	"use strict";

	angular
		.module('pg.superadmin')
			.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
			.state('superadmin', {
					url: '/superadmin',
					templateUrl: 'app/components/superadmin/superadmin.tmpl.html',
					controller: 'SuperadminCtrl',
					abstract:true
			})
			.state('superadmin.bars', {
					url: '',
					templateUrl: 'app/components/superadmin/bars.tmpl.html',
					controller: 'SuperadminBarsCtrl'
			})
			.state('superadmin.createBar',{
				url:'/create-bar',
				templateUrl: 'app/components/superadmin/create-bar.tmpl.html',
				controller: 'CreateBarCtrl'
			})
			.state('superadmin.changeadmins',{
				url:'/{id}/change-admins',
				templateUrl: 'app/components/superadmin/changeadmins.tmpl.html',
				controller: 'ChangeAdminsCtrl'
			});
	}
})();
