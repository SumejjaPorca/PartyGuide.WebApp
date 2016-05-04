(function(){
	"use strict";

	angular
		.module('pg.bars')
			.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider, $httpProvider) {
		$stateProvider
			.state('bars', {
                url: '/bars',
                controller: 'barsCtrl',
                templateUrl: 'app/components/bars/bars/bars.tmpl.html'
            })
			.state('bars.details', {
								url: '/bars/{id}',
								templateUrl: 'app/components/bars/details/details.tmpl.html',
								controller: 'barDetailsCtrl'
						});
      
	}
})();
