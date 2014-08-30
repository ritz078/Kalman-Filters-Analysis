/**
* btpApp Module
*
* Crowd data analysis using Kalman Filters
*/
var app=angular.module('btpApp', ['ui.bootstrap']);

app.controller('btpCtrl', ['$scope','$http', function($scope,$http){
	$http.get('/js/c.json').success(function(data){
		$scope.x=data.cdata._ArrayData_.length;
		console.log(data);
	});
	
}]);

