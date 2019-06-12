angular.module("parisApp")
.controller("welcomeController", ['$rootScope', '$http', function ($rootScope, $http) {
    var self = this;
    $rootScope.username = "Guest";
    $rootScope.isLogin = false;

    self.start=function(){
        console.log("Start")
      //  authentication.tokenValidation();
    }

    self.get3RandomPois=function(){
        console.log("enter")
        $http.get("http://localhost:3000/POIs/get3RandomPOIs").then(
            function success(response){
                console.log(response);
                self.randPOIs = response;
            }
            , function error(response){
                console.log("fail")
                self.randPOIs = response;
            })

        // self.randPOIs = httpRequests.get("POIs/get3RandomPOIs");
        // if (randPOIs != ("fail")){
        //     console.log(randPOIs);
        // }
    }

    self.getPoiInfo=function(poiID){
        console.log("getPoiInfo");
    }

    self.register=function(){
        console.log("register");
    }
}]);