(function() {
  'use strict';

  angular
    .module('pg.bars')
    .config(config);

  /** @ngInject */
  function config(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  }

})();
