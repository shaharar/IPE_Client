angular.module("parisApp")
.controller("allPoisController", ['httpRequests', '$window', function (httpRequests,$window) {
    var self = this;

    self.start=function(){
    }

    self.getAllPOIs=function(){
        httpRequests.get("POIs/getAllPOIs")
        .then (function (response){
            self.allPoiRes = response.data;
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
        });
    }

    self.getPoiInfo=function(poiID){
         //  TODO-----------open POI modal window-------------------------------------
    }

    self.getPOIsCategories=function(){
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
        }, function(response){
             //------------TODO OPTIONAL handle error------------------------
        });
    }

    self.getFavoritePois=function(){
        $window.location.href = "#!/favorites";
    }

}]);