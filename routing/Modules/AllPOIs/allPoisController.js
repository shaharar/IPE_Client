angular.module("parisApp")
.controller("allPoisController", ['httpRequests', 'authentication', function (httpRequests, authentication) {
    var self = this;

    self.start=function(){
        console.log("Start")
        authentication.tokenValidation();
    }

    self.getAllPOIs=function(){
        httpRequests.get("POIs/getAllPOIs")
        .then (function (response){
            self.allPoiRes = response.data;
        });
    }

    self.getPoiInfo=function(poiID){
         //  TODO-----------move to POI page-------------------------------------
    }

    self.getPOIsCategories=function(){
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
        });
    }

}]);