(function (module) {
    "use strict"
    module.factory('authInterceptor', [ 'localStorageService', function (localStorageService) {

        return{

            request: function (config) {

                config.headers = config.headers || {};

                var authData = localStorageService.get('authorizationData');
                if (authData && authData.token) {
                    config.headers['x-access-token'] = authData.token;
                }

                return config;
            }
        };

    }]);
})(angular.module('pg.account'));
