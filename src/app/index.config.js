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

      REG:{ // Registration
        REGISTER:"Register",
        USERNAME:"Username",
        EMAIL:"Email",
        PASSWORD:"Password",
        RPASSWORD:"Repeat password",
        REQUIRED:"Required.",
        EMAIL_NOT_WALID:"Email doesn't have valid format.",
        PASS_SHORT:"Password need to have at least 8 chars.",
        PASS_NOT_SAME:"Passwords are not same.",
        CHECK_FIELDS:"Check form fields, some of them are invalid!",
        INVALID_FORM:"Invalid form",
        MAIL_SENT:"Confirmation mail was sent to you.",
        REG_SUCCESSFUL:"Succesful registration",
        USERNAME_EXISTS: "Username already exists.",
        USERNAME_REQ:"Username required.",
        USERNAME_SHORT:"Username is short. Minimal length is 6 chars.",
        EMAIL_EXISTS:"Email already exists.",
        PASS_REQ:"Password is required.",
        PASS_WEAK:"Password is weak. Password must be minimum 8 char long, and have at least one lowercase and uppercase letter.",
        REG_ERR:"Registration error.",
        LOGIN:"Login",
        RESPASS:"Reset password"
      },
      NAVBAR:{
        LANG_EN: 'English',
        LANG_BS: 'Bosnian',
        HELLO: 'Hello'
      },
      BAR:{
        LIST:{
          DETAILS:"See more details"
        },
        DET:{
          SHOW_MAP:"Show on the map",
          CLOSE_MAP:"Hide the map"
        }
      }
    });
    $translateProvider.translations('bs', {

      REG:{ // Registracija
        REGISTER:"Registriraj se",
        USERNAME:"Korisničko ime",
        EMAIL:"Email",
        PASSWORD:"Lozinka",
        RPASSWORD:"Ponovi lozinku",
        REQUIRED:"Obavezno.",
        EMAIL_NOT_WALID:"Format email-a nije validan.",
        PASS_SHORT:"Lozinka mora imati najmanje 8 znakova.",
        PASS_NOT_SAME:"Lozinke nisu jednake.",
        CHECK_FIELDS:"Provjerite polja forme, neka od njih nisu ispravna!",
        INVALID_FORM:"Neispravna forma",
        MAIL_SENT:"Confirmation mail was sent to you.", //TODO
        REG_SUCCESSFUL:"Uspješna registracija",
        USERNAME_EXISTS: "Korisničko ime već postoji.",
        USERNAME_REQ:"Korisničko ime je obavezno.",
        USERNAME_SHORT:"Korisničko ime je kratko. Najmanja dopuštena dužina je 6 znakova.",
        EMAIL_EXISTS:"Email već postoji.",
        PASS_REQ:"Lozinka je obavezna.",
        PASS_WEAK:"Lozinka je slaba. Lozinka mora bit duga bar 8 znakova i imati barem jedno veliko i jedno malo slovo.",
        REG_ERR:"Greška pri registraciji.",
        LOGIN:"Logiraj se",
        RESPASS:"Resetiraj lozinku"
      },
      NAVBAR:{
        LANG_EN: 'Engleski',
        LANG_BS: 'Bosanski',
        HELLO: 'Zdravo'
      },
      BAR: {
        LIST:{
          DETAILS:"Pogledaj više detalja"
        },
        DET: {
          SHOW_MAP:"Prikaži na mapi",
          CLOSE_MAP:"Sakrij mapu"
        }
      }
    });
    $translateProvider.preferredLanguage('en');
  }

})();
