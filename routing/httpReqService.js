angular.module("parisApp")
.service('httpRequests',['$http', '$window', function ($http,$window) {

    var localhost = "http://localhost:3000/";
    this.get = function(path) {
        // if (!path.startsWith("POIs/private")){
        //     return $http.get(localhost + path)
        // }
        // else{
        //     // console.log("config: "+header+config+"'}")
        //     return $http.get(localhost + path, "header: {'x-auth-token': '"+ $window.sessionStorage.getItem("userToken")+"'}");
        // }

        return $http(
            {
                method:'GET',
                url:localhost + path,
                // headers:{
                //     'x-auth-token': $window.sessionStorage.getItem("userToken")
                // }
            }
        )
    }

    this.get2POIsByCategories = function() {
        console.log(JSON.stringify($window.sessionStorage))
        var req = {
            method:'GET',
            url: "http://localhost:3000/POIs/private/get2POIsByCategories",
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("userToken")
            }
        };
        console.log("\n" + JSON.stringify(req))
        return $http(
           req 
        )
    }

    this.post = function(path, data) {
        // if (!path.startsWith("POIs/private")){
        //     return $http.post(localhost + path, data);
        // }
        // else{
        //     // console.log("config: "+header+config+"'}")
        //     return $http.post(localhost + path, data, "header: {'x-auth-token': '"+ $window.sessionStorage.getItem("userToken")+"'}");
        // }
        return $http(
            {
                method:'POST',
                url:localhost + path,
                // headers: {
                //     'x-auth-token': $window.sessionStorage.getItem("userToken")
                // },
                data:{data}
            }
        )
    }

    this.postLogin = function(data) {
        return $http(
            {
                method:'POST',
                url:"http://localhost:3000/Users/login",
                data:{
                    Username: data.Username,
                    Password: data.Password
                }
            }
        )
    }
}])