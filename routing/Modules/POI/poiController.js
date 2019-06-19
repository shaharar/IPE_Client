angular.module("parisApp")
.controller("poiController", ['httpRequests', function (httpRequests) {
    var self = this;

    self.start=function(){
        console.log("Start")
    }

    self.getAllPOIs=function(){
        httpRequests.get("POIs/getAllPOIs")
        .then (function (response){
            self.allPoiRes = response.data;
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
        });
    }

    self.getPOIsCategories=function(){
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
        }, function(response){
             //------------TODO OPTIONAL handle error------------------------
        });
    }

    self.getPoiInfo=function(){
     //  TODO-----------move to POI page-------------------------------------
    }

    self.getPOIByID=function(poiId){
        httpRequests.get("POIs/getPOIByID/"+poiId)
        .then (function (response){
            self.poiRes = response.data;
        });
    }

    self.getPOIByName=function(poiName){
        httpRequests.get("POIs/getPOIByName/"+poiName)
        .then (function (response){
            self.poiRes = response.data;
        });
    }
}]);

    //  TODO-----------add rank-------------------------------------


    //  TODO-----------add to favorites ???-------------------------------------
