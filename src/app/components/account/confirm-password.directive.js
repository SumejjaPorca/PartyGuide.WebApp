(function (){
	"use strict";

	angular
		.module('pg.account')
		.directive('confirmPassword', confirmPassword);

	/** @ngInject */
	function confirmPassword(){
		return {
			require: 'ngModel',
			scope: {
				original: "=confirmPassword"
			},
			link: function(scope, elem, attrs, ctrl){
				ctrl.$validators.confirm = function(modelValue, viewValue){
					var data = modelValue || viewValue;

					return angular.equals(data, scope.original);
				};

				scope.$watch('original', function(){
					ctrl.$validate();
				});
			}
		};
	}

})();
