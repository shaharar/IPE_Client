angular.module("parisApp")
.controller("welcomeController", ['httpRequests','authentication', function (httpRequests,authentication) {
    var self = this;
    // $rootScope.username = "Guest";
    // $rootScope.isLogin = false;

    self.start=function(){
        console.log("Start")
        authentication.tokenValidation();
    }

    self.get3RandomPois=function(){
        httpRequests.get("POIs/get3RandomPOIs")
        .then (function (response){
            self.randPOIs = response.data;
            console.log(self.randPOIs[0].Picture)
        });
    }

    self.getPoiInfo=function(poiID){
        // httpRequests.get("POIs/getPOIByID/"+poiID)
        // .then (function (response){
        //     self.poiRes = response.data;
        //     console.log(self.poiRes.Name)
        // });
        //  TODO-----------move to POI page-------------------------------------
    }

   

    self.getRegUserPois = function(){
        httpRequests.get("POIs/private/get2POIsByCategories")
        .then(function(response){
            self.poisByCat = response.data;
        })

        // TODO-------------------handle favorites order----------------------------
        httpRequests.get("POIs/private/getFavoritesPOIsOfUser/" + poiNum)
        .then(function(response){

        })
    }

    // TODO--------------------move to Register page-----------------------------
    self.register=function(){

    }
}]);