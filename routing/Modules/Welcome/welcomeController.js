angular.module("parisApp")
.controller("welcomeController", ['httpRequests','$rootScope', '$window', function (httpRequests,$rootScope,$window) {
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
        httpRequests.get("POIs/getPOIByID/"+poiID)
        .then (function (response){
            self.name = response.data.Name;
            self.description = response.data.Description;
            self.usersWatching = response.data.UsersWatching;
            self.rank = response.data.Rank;
            // self.review1 = response.data.Review1;
            // self.review2 = response.data.Review2;
            if (!response.data.Review1){
                self.review1 = "none";
            }
            else{
                self.review1 = response.data.Review1.Rank + ", " + response.data.Review1.Review + ", " + response.data.Review1.Date;
            }
            if (!response.data.Review2){
                self.review2 = "none";
            }
            else{
                self.review2 = response.data.Review2.Rank + ", " + response.data.Review2.Review + ", " + response.data.Review2.Date;
            }
            self.picture = response.data.Picture;
            self.ID = response.data.ID;
        });
    }

   

    self.getRegUserPois = function(){
        httpRequests.get("POIs/private/get2POIsByCategories")
        .then(function(response){
            self.poisByCat = response.data;
        }, function(response){
            alert("Something went wrong..")
        })

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