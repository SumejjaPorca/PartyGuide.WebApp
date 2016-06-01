
(function(){
	"use strict";

	angular
		.module('pg')
		.controller('HomeCtrl', homeCtrl);

		/** @ngInject */
		function homeCtrl($scope, accountService, $state, toastr, barsService, reviewsService, postsService, $filter){

			postsService.getStats(false).then(function(response){
					angular.copy(response.data.dates, $scope.posts.labels);
					if($scope.posts.labels.length != 0)
					$scope.posts.labels.forEach(function(item, index){
						$scope.posts.labels[index] = $filter('date')($scope.posts.labels[index], 'MMM dd yyyy');
					});
					angular.copy(response.data.counts, $scope.posts.data[0]);
			}
		);
		postsService.getStats(true).then(function(response){
				angular.copy(response.data.dates, $scope.events.labels);
				if($scope.events.labels.length != 0)
				$scope.events.labels.forEach(function(item, index){
					$scope.events.labels[index] = $filter('date')($scope.events.labels[index], 'MMM dd yyyy');
				});
				angular.copy(response.data.counts, $scope.events.data[0]);
		}
	);

		accountService.getStats().then(function(response){
				$scope.main.data[0] = response.data.count;
		}
		);
		barsService.getStats().then(function(response){
				$scope.main.data[1] = response.data.count;
		}
		);

		reviewsService.getStats().then(function(response){
				$scope.main.data[2] = response.data.count;
		}
		);


		barsService.getTop().then(function(response){
				var bars = response.data;
				bars.forEach(function(item){
					$scope.bars.data.push(item.total/item.num);
					$scope.bars.labels.push(item.barName);
				})
		}
		);

    $scope.main = {
			labels : ["Users", "Bars", "Reviews"],
	    data : [0, 0, 0],
	    type : 'Pie'

		};

		$scope.bars = {
			labels : [],
			data : [],
			type : 'Pie'

		};

		$scope.posts = {
			labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			data: [[0,0,0,0,0,0,0]],
			series: ['Posts statistics'],
			onClick: function(){}
		};

		$scope.events = {
			labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			data: [[0,0,0,0,0,0,0]],
			series: ['Events statistics'],
			onClick: function(){}
		};

    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };

            $scope.go = function(state, params){
                $state.go(state, params)
            };




		}
})();
