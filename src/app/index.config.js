(function() {
  'use strict';

  angular
    .module('pg')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    //set translation options
    $translateProvider.translations('en', {
    DETAILS: 'See more details...',
    HELLO: 'Hello',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_BS: 'bosnian'
  });
  $translateProvider.translations('bs', {
    DETAILS: 'Pogledaj više detalja...',
    HELLO: 'Zdravo',
    BUTTON_LANG_EN: 'engleski',
    BUTTON_LANG_BS: 'bosanski'
  });
  $translateProvider.preferredLanguage('en');
  }

})();
