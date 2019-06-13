angular.module("parisApp")
.service('httpRequests', function ($http) {

    var localhost = "http://localhost:3000/";
    this.get = function(path) {
        return $http.get(localhost + path)
    }

    this.post = function(path, data) {
        return $http.post(localhost + path, data)
    }
})