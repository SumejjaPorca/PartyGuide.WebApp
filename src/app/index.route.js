(function() {
  'use strict';

  angular
    .module('pg')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.tmpl.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
