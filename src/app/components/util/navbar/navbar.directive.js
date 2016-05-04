(function() {
  'use strict';

  angular
    .module('pg')
    .directive('spNavbar', acmeNavbar);

    /** @ngInject
     * @author Luka
     */
    function acmeNavbar() {
        var directive = {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/util/navbar/navbar.tmpl.html',
            scope: { },
            controller: ['$scope', 'accountService',  '$translate', NavbarController]
        };

        return directive;

        function NavbarController($scope, accountService, translate) {
            $scope.links = [
                { title:'Home', state:'home'}
            ];
            $scope.changeLanguage = function (key) {
   translate.use(key);
 };

            $scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            }

            $scope.getUser = function(){
                return accountService.getCurrentUser().user;
            }
        }
    }

})();
