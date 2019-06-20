angular.module("parisApp")
.controller("poiController", ['httpRequests', '$window',function (httpRequests,$window) {
    var self = this;

    self.start=function(){
        console.log("Start")
        self.poisByCat1 = [];
        self.poisByCat2 = [];
        self.poisByCat3 = [];
        self.poisByCat4 = [];
        self.starImg ="/images/greyStar.png";
        self.nameForSearch = "";
        self.isSearch = false;

    }


    self.getAllPOIs=function(){
        httpRequests.get("POIs/getAllPOIs")
        .then (function (response){
            self.allPoiRes = response.data;
            self.setPoisByCatLists();
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
        });
    }

    
    self.setPoisByCatLists=function(){
        for(var i=0; i<self.allPoiRes.length; i++){
            let poi = self.allPoiRes[i];
            console.log(poi.CategoryID)
            if(poi.CategoryID == "1"){
                self.poisByCat1.push(poi);
            }
            else if(poi.CategoryID == "2"){
                self.poisByCat2.push(poi);
            }
            else if(poi.CategoryID == "3"){
                self.poisByCat3.push(poi);
            }
            else if(poi.CategoryID == "4"){
                self.poisByCat4.push(poi);
            }
        }
    }
    self.getPOIsCategories=function(){
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
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
            self.review1 = response.data.Review1;
            self.review2 = response.data.Review2;
            self.picture = response.data.Picture;
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
       });
    }

    self.addToFavorites=function(poiId){
        self.starImg ="/images/goldStar.png";
    }
    

    self.getPOIByID=function(poiId){
        httpRequests.get("POIs/getPOIByID/"+poiId)
        .then (function (response){
            self.poiRes = response.data;
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
       });
    }

    self.getPOIByName=function(){
        httpRequests.get("POIs/getPOIByName/"+self.nameSearched)
        .then (function (response){
            console.log(response.data)
            self.poiByNameRes = response.data[0];
            self.isSearch = true;
        }, function(response){
            alert("No POIs were found");
            //------------TODO OPTIONAL handle error------------------------
       });
    }

    self.getFavoritePOIs=function(){
        $window.location.href = "#!/favorites";
    }

    self.return=function(){
        self.isSearch = false;
    }
}]);

    //  TODO-----------add rank-------------------------------------


    //  TODO-----------add to favorites ???-------------------------------------
