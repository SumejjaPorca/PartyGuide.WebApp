(function(){
	"use strict";

	angular
		.module('pg.bars')
		.controller('barsListCtrl', barsCtrl);

	/**@ngInject */
	function barsCtrl($scope, accountService, $state, barsService){

		$scope.bars = [];


		$scope.getAll = function(){
			barsService.get().then(function(bars) {
				angular.copy(bars, $scope.bars);
			});
		}
		$scope.isLoggedIn = function(){
			return accountService.isLoggedIn();
		};

		$scope.go = function(state, params){
			$state.go(state, params)
		};

		$scope.searchName = function(){
			if($scope.search.name == ""){ // get all
				$scope.getAll();
			}
			else {
				barsService.searchByName($scope.search.name).then(function(bars){
					angular.copy(bars, $scope.bars);
				});
			}
		}

		$scope.searchTags = function(){
			if($scope.search.tags == ""){ // get all
				$scope.getAll();
			}
			else {
				var tags = $scope.search.tags.split(" ");
				console.log(tags);
				barsService.searchByTags(tags).then(function(bars){
					angular.copy(bars, $scope.bars);
				});
			}
		}
		$scope.search = {
			name: "",
			tags:""
		}

		$scope.getAll();
	}

})();
