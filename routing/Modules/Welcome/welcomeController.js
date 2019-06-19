angular.module("parisApp")
.controller("welcomeController", ['httpRequests','authentication','$rootScope', '$window', function (httpRequests,authentication,$rootScope,$window) {
    var self = this;

    self.start=function(){
    }

    self.get3RandomPois=function(){
        httpRequests.get("POIs/get3RandomPOIs")
        .then (function (response){
            self.randPOIs = response.data;
        }, function(response){
        //------------TODO OPTIONAL handle error------------------------
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
        }, function(response){
            alert("Something went wrong..")
        })

        // TODO-------------------handle favorites order----------------------------
        httpRequests.get("POIs/private/getFavoritesPOIsOfUser/2")
        .then(function(response){
            self.favoritePois = response.data;
        }, function(response){
            if (response.data.message == "There are no favorites POIs for this user"){
                alert("You have no favorite POIs");
            }            
            else{
                alert("Oops..the system failed to show your favorite POIs")
            }        
        })
    }

    self.register=function(){
        $window.location.href = "#!/register";
    }

    self.login=function(){
        $window.location.href = "#!/login";
    }
}]);