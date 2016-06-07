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
        RESPASS:"Reset password",
        LOGOUTSUC:"Log out succesful.",
        SEND_RESET_CODE: "Send me a reset code",
        RESET_LINK_SENT:"Reset link sent to your email.",
        E_WRONG:"Wrong email. There is no user with this email.",
        E_REQ:"Email is required.",
        RES_REQ_FAIL:"Failed to send reset request.",
        C_PASS:"Change password"
      },
      ECONF:{
        EC:"Email Confirmation",
        ERROR:"Confirmation error!",
        SUCCESS:"Confirmation successful!",
        TNVALID:"Token expired or not valid.",
        TEXPIRED:"Token expired or not valid."
      },
      HOME:{
        NOT_LOGIN:"You are not logged in! :(",
        REGISTER:"Register",
        OR:"- or -",
        LOGIN:"Log in!",
        PAG_STAT:"Our page statistic",
        USER_STAT:"User statistic",
        POST_STAT:"Posts statistics",
        BEST_BARS:"Best rated bars",
        EVENTS:"Events"
      },
      NAVBAR:{
        LANG_EN: 'English',
        LANG_BS: 'Bosnian',
        HELLO: 'Hello'
      },
      BAR:{
        BARS:"Bars",
        LIST:{
          DETAILS:"See more details",
          SEARCH: "Search",
          E_BAR_NAME:"Enter bar's name",
          E_TAGS:"Enter tags you want search",
          S_NAMES:"Search by name",
          S_TAGS:"Search by tags",
          S_NEAR:"Search near bar",
          P_B_NAME:"Bar's name",
          P_TAGS:"Tags separated by space"
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
        MAIL_SENT:"E-mail za konfirmaciju vam je poslan.",
        REG_SUCCESSFUL:"Uspješna registracija",
        USERNAME_EXISTS: "Korisničko ime već postoji.",
        USERNAME_REQ:"Korisničko ime je obavezno.",
        USERNAME_SHORT:"Korisničko ime je kratko. Najmanja dopuštena dužina je 6 znakova.",
        EMAIL_EXISTS:"Email već postoji.",
        PASS_REQ:"Lozinka je obavezna.",
        PASS_WEAK:"Lozinka je slaba. Lozinka mora bit duga bar 8 znakova i imati barem jedno veliko i jedno malo slovo.",
        REG_ERR:"Greška pri registraciji.",
        LOGIN:"Logiraj se",
        RESPASS:"Resetiraj lozinku",
        LOGOUTSUC:"Odjava uspješna.",
        SEND_RESET_CODE: "Pošalji mi kod za resetiranje",
        RESET_LINK_SENT:"Kod za resetiran je poslan na email.",
        E_WRONG:"Pogrešan email. Ne postoji korisnik s ovim emailom.",
        E_REQ:"Email je obavezan.",
        RES_REQ_FAIL:"Slanje koda za resetiranje nije uspjelo.",
        C_PASS:"Promijeni password"
      },
      ECONF:{
          EC:"E-mail konfirmacija",
          ERROR:"Greska pri konfirmaciji!",
          SUCCESS:"Uspješna konfirmacija!",
          TNVALID:"Token je istekao ili nije validan.",
          TEXPIRED:"Token je istekao ili nije validan."
      },
      HOME:{
        NOT_LOGIN:"Niste logirani! :(",
        REGISTER:"Registriraj se",
        OR:"- ili -",
        LOGIN:"Logiraj se!",
        PAG_STAT:"Statistika stranice",
        USER_STAT:"Statistika korisnika",
        POST_STAT:"Statitika postova",
        BEST_BARS:"Najbolje ocijenjeni barovi",
        EVENTS:"Eventi"
      },
      NAVBAR:{
        LANG_EN: 'Engleski',
        LANG_BS: 'Bosanski',
        HELLO: 'Zdravo'
      },
      BAR: {
        BARS:"Barovi",
        LIST:{
          DETAILS:"Pogledaj više detalja",
          SEARCH:"Traži",
          E_BAR_NAME:"Unesi ime bara",
          E_TAGS:"Unesi tagove koje želiš pretražiti",
          S_NAMES:"Pretraži po imenu",
          S_TAGS:"Pretraži po tagovima",
          S_NEAR:"Pretraži barove u blizini",
          P_B_NAME:"Ime bara",
          P_TAGS:"Tagovi odijeljeni razmakom"
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
