(function() {
  'use strict';

  angular
    .module('pg', ['ui.router', 'pascalprecht.translate', 'ui.bootstrap',
    'pg.account','pg.superadmin', 'pg.bars', 'pg.users', 'pg.posts', 'angularFileUpload', 'chart.js', 'ngRateIt']);

})();
