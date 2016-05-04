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
            controller: ['$scope', 'accountService', NavbarController]
        };

        return directive;

        function NavbarController($scope, accountService) {
            $scope.links = [
                { title:'Home', state:'home'}
            ];

            $scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            }

            $scope.getUser = function(){
                return accountService.getCurrentUser().user;
            }

            $scope.isSuperAdmin = function(){
                return accountService.isSuperAdmin();
            }


        }
    }

})();
