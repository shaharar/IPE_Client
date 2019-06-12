angular.module("parisApp")
.service('authentication', ['$http', '$rootScope', 'storageService', function ($http, $rootScope, storageService) {
    var userToken = "";

    this.setToken = function(token) {
        userToken = token;
        $http.defaults.headers.common['x-auth-token'] = userToken;
    }

    this.setCurrUser = function(currUser) {
        $rootScope.username = currUser;
        $rootScope.isLogin = true;
    }
    // $rootScope.username = "Guest";
    // $rootScope.isLogin = false;

    this.tokenValidation = function() {
        var token = storageService.getStorageRec("userToken");
        if (token != null) {
            authentication.setToken(token);
            $http.get("http://localhost:3000/POIs/private/")
            .then(function (response) {
                if (response.data.message == "Access denied. No token provided" || response.data.message == "Invalid token") {
                    storageService.remove("userToken")
                    authentication.setToken("");
                    $rootScope.username = "Guest";
                    $rootScope.isLogin = false;
                    // $location.path("/")
                }
                else {
                    authentication.setCurrUser(response.data.payload.username)
                }
            })
        }
    }
}])

// .service('validation', ['$http', 'authentication', '$rootScope', function ($http, authentication, $rootScope) {

// }])
