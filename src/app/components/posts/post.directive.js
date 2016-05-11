(function() {
  'use strict';

  angular
    .module('pg.posts')
    .directive('pgPost', pgPosts);

    function pgPosts() {
        var directive = {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/posts/post.tmpl.html',
            scope: {
              post: '='
            },
            controller: ['$scope', 'accountService',  '$translate', ctrl]
        };

        return directive;

        function ctrl($scope, accountService, translate) {

        }
    }

})();
