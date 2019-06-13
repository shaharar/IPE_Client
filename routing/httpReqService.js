angular.module("parisApp")
.service('httpRequests', function ($http) {

    var localhost = "http://localhost:3000/";
    this.get = function(path) {
        $http.get(localhost + path).then(
            function success(response){
                return response;
            }
            , function error(response){
                return "fail";
            })
    }

    this.post = function(path) {
        $http.post(localhost + path)
    }
})