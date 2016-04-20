(function(){
	"use strict";

	angular
		.module('pg.account')
		.service('accountService', accountService);

	/** @ngInject */
	function accountService($http, localStorageService, serverName, $q){

		var currentUser = { username: null, token: null, isLoggedIn: false };

				this.confirmEmail = function(code){
					var deferred = $q.defer();
					
					$http({
							url: serverName + '/api/user/confirm-email',
							method: "POST",
							data: 'code=' + code
					}).then(function (response) {
						 deferred.resolve(currentUser);
					},
					function (response) {
							deferred.reject(response);
					});

					return deferred.promise;
				};

        this.login = function (loginModel) {

            var deferred = $q.defer();

            $http({
                url: serverName + '/api/user/login',
                method: "POST",
                data: 'username=' + loginModel.username + '&password=' + loginModel.password
            }).then(function (response) {
                var data = { token: response.token, username: response.username};
                localStorageService.set('authorizationData', data);
                setCurrentUser(data);
                deferred.resolve(currentUser);
            },
            function (response) {
                localStorageService.set('authorizationData', { token: null, username: null });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.logout = function () {
            localStorageService.set('authorizationData', { token: null, username: null });
            currentUser.username = null;
            currentUser.IsLoggedIn = false;
        };

        this.register = function (registerModel) {
            var deferred = $q.defer();

            $http({
                url: serverName + '/api/user/register',
                method: "POST",
                data: registerModel
            }).then(function (response) {
                 deferred.resolve(response);
            },
            function (response) {
                localStorageService.set('authorizationData', { token: null, username: null });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };
        this.getCurrentUser = function () {
            var data = localStorageService.get('authorizationData');

            if (data)
            {
                setCurrentUser(data);
            } else{
                setCurrentUser({token:null, username:null});
            }
            return currentUser;
        };
        this.isLoggedIn = function(){
            var c_user = this.getCurrentUser();

            return !!c_user && !!c_user.token;
        };
        var setCurrentUser = function (loginModel) {
            currentUser.token = loginModel.token;
            currentUser.username = loginModel.username;
        };
    }
})();
