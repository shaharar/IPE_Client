angular.module("parisApp")
.controller("poiController", ['httpRequests', 'authentication', function (httpRequests, authentication) {
    var self = this;

    self.start=function(){
        console.log("Start")
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
