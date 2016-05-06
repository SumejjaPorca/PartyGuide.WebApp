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
      REGISTER:"Register",
      LOGIN:"Login",
      REQ:"Required.",
      PNS:"Passwords are not same.",
      PS:"Password need to have at least 8 chars.",
      RP:"Repeat password",
      USERNAME:"Username",
      BUTTON_LANG_EN: 'english',
      BUTTON_LANG_BS: 'bosnian'
    });
    $translateProvider.translations('bs', {
      DETAILS: 'Pogledaj više detalja...',
      HELLO: 'Zdravo',
      REGISTER:"Registruj se",
      LOGIN:"Prijavi se",
      REQ:"Obavezno.",
      PNS:"Passwordi nisu jednaki.",
      PS:"Password mora imati najmanje 8 znakova.",USERNAME:"Korisnicko ime",
RP:"Ponovi password",
      BUTTON_LANG_EN: 'engleski',
      BUTTON_LANG_BS: 'bosanski'
    });
    $translateProvider.preferredLanguage('en');
  }

})();
