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
                templateUrl: 'app/components/bars/bars.tmpl.html',
								abstract:true
            })
			.state('bars.list', {
                url: '/',
                controller: 'barsListCtrl',
                templateUrl: 'app/components/bars/list/list.tmpl.html'
            })
			.state('bars.details', {
								url: '/details/{id}',
								templateUrl: 'app/components/bars/details/details.tmpl.html',
								controller: 'barDetailsCtrl',
                params: { id: null}
						})
			.state('bars.change', {
								url: '/change/{id}',
								templateUrl: 'app/components/bars/change/change.tmpl.html',
								controller: 'BarChangeCtrl',
                params: { id: null}
						})
			.state('bars.post', {
								url: '/post/{id}',
								templateUrl: 'app/components/posts/create.tmpl.html',
								controller: 'PostsCreateCtrl',
								params: { id: null}
						});

	}
})();
