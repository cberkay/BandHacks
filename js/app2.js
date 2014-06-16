console.log("hello app2.js");
var app = angular.module('myapp', []);

app.config(function($routeProvider) {
	$routeProvider.when('/tasks', {
		templateUrl: "tasks.html", 
		controller: 'TestController2'
	});
	$routeProvider.when('/hello', {
		templateUrl: "deneme.html", 
		controller: 'HelloWorldCtrl'
	})
	.otherwise({redirectTo: '/dashboard.html'});
});

app.controller('TestController', function(){

});

app.controller('TestController2', function($scope){
	$scope.test = "hello";
	$scope.taskList = "";
	$scope.createTask = function (task) {
		console.log("hello createTask");
		$scope.taskList += task;
	};
});

app.controller("HelloWorldCtrl", function ($scope){
   $scope.helloMessage="Hello World";
});