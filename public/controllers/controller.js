var myApp = angular.module("myApp", []);

myApp.controller("UserDataCtrl", function ($scope, $http) {
    $http.get('/get/Users').then(function (response) {
        $scope.userList = response.data;
    });
});

myApp.factory('logTimeTaken', [function() {  
    var logTimeTaken = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return logTimeTaken;
}]);

myApp.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('logTimeTaken');
}]);

myApp.controller('BacklogDataCtrl', function ($scope, $http, myService) {
    $http.get('/get/Backlogs').then(function (response) {
        myService.update(response.data);
        $scope.backlogsList = myService.getContent();
    });

    $scope.test = function () {
        $http.post('/post/backlog', $scope.formData).then(function (response) {
            myService.update(response.data);
            $scope.backlogsList = myService.getContent();
            $scope.time = response.config.responseTimestamp - response.config.requestTimestamp;
        });
    };
});

myApp.controller("TaskDataCtrl", function ($scope, $http) {
    $http.get('/get/Tasks').then(function (response) {
        $scope.tasksList = response.data;
    });
});

myApp.service('myService', function () {
    var content;
    this.update = function (response) {
        content = response;
    };
    this.getContent = function () {
        return content;
    };
});