angular.module("parisApp")
.service('httpRequests',['$http', '$window', function ($http,$window) {

    var localhost = "http://localhost:3000/";
    this.get = function(path) {
        return $http(
            {
                method:'GET',
                url:localhost + path,
                headers:{
                    'x-auth-token': $window.sessionStorage.getItem("userToken")
                }
            }
        )
    }

    this.post = function(path, data) {
        return $http(
            {
                method:'POST',
                url:localhost + path,
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("userToken")
                },
                data:data
            }
        )
    }
}])