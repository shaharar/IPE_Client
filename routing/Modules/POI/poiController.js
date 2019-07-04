angular.module("parisApp")
.controller("poiController", ['httpRequests', '$window','$rootScope', '$scope', function (httpRequests,$window,$rootScope,$scope) {
    var self = this;
    $scope.sortTypes = ['Default','Rank'];
    self.sortBy = 'Default';

    self.start=function(){
        console.log("Start")
        self.poisByCat1 = [];
        self.poisByCat2 = [];
        self.poisByCat3 = [];
        self.poisByCat4 = [];
        self.starImg ="/images/greyStar.png";
        self.goldStarImg = "/images/goldStar.png";
        self.favImg = [];
        for (var i = 0; i < 21; i++){
            if ($rootScope.favoritesList.indexOf(""+i) != -1){
                self.favImg[i] = self.goldStarImg;
            }
            else{
                self.favImg[i] = self.starImg;
            }
        }
        self.numOfFav = $rootScope.favoritesList.length;
        console.log(self.favImg);
        // self.addToFav = false;
        self.nameForSearch = "";
        self.isSearch = false;
        self.chosenCategories = [];
        self.rankOptions = [1,2,3,4,5];
        self.getCategories();
    }

    self.setSortType=function(){
        self.sortBy = self.sortType;
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

    self.getCategories=function(){  
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
            
            for (var i = 0; i < self.categories.length; i++){
                self.chosenCategories.push(""+self.categories[i].ID)
            }
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
        });
    }

    
    self.chooseCategories=function (category) {
        if (self.chosenCategories[category] == -1) {
            self.chosenCategories[category] = category;
        }
        else {
            self.chosenCategories[category] = -1;
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
            self.ID = response.data.ID;
        }, function(response){
            //------------TODO OPTIONAL handle error------------------------
       });
    }

    self.updateFavorites=function(poiId){
        if(self.favImg[poiId] == self.starImg){
            self.addToFavorites(poiId);
        }
        else{
            self.removeFromFavorites(poiId);
        }
    }

    self.addToFavorites=function(poiId){
        // self.starImg ="/images/goldStar.png";
        console.log("add");
        console.log(poiId);
        self.favImg[poiId] = self.goldStarImg;
        $rootScope.favoritesList.push(poiId);
        self.numOfFav++;
        self.saveFavoritePOIs();
        // self.addToFav = true;
    }

    self.removeFromFavorites=function(poiId){
        console.log("remove");
        console.log(poiId);
        self.favImg[poiId] = self.starImg;
        var currFavoritesList = $rootScope.favoritesList;
        currFavoritesList.splice(currFavoritesList.indexOf(poiId),1);
        $window.sessionStorage.setItem("favorites",currFavoritesList);
        $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
        self.numOfFav--;
        self.saveFavoritePOIs();
        // self.addToFav = false;
    }

    self.saveFavoritePOIs=function(){
        var favoritePOIsId = $rootScope.favoritesList;
        var favoritePOIsPriorities = [];
        for(var i = 0; i < favoritePOIsId.length; i++){
            favoritePOIsPriorities.push(i);
        }
        let favoritesDetails = {
            favorites : favoritePOIsId,
            priorities : favoritePOIsPriorities
        }
        httpRequests.post("POIs/private/saveFavoritePOIs", favoritesDetails) 
        .then (function (response){
            if (response.data.message == "Favorites list was updated"){
                alert("Changes were saved successfully");
            }
        }, function(response){
                             //------------TODO OPTIONAL handle error------------------------

        })
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
        console.log("search");
        httpRequests.get("POIs/getPOIByName/"+self.nameSearched)
        .then (function (response){
            console.log(response.data)
            self.poiByNameRes = response.data[0];
            self.isSearch = true;
        }, function(response){
            alert("No POIs were found");
       });
    }

    self.getFavoritePOIs=function(){
        $window.location.href = "#!/favorites";
    }

    self.return=function(){
        self.isSearch = false;
        self.nameSearched = "";
    }

    self.setIDAddRank=function(poiID){
        self.idInAddRank = poiID;
    }

    self.addRank=function () {
        var newReview = {
            ID: self.idInAddRank,
            Rank: self.rankInput,
            Review: self.reviewInput
        }
        console.log(newReview)
        httpRequests.post("POIs/private/addRank/", newReview)
            .then(function (response) {
                if (response.data.message == "Review added successfuly" || 
                    response.data.message == "This POI already has this review from this user") {
                    alert(response.data.message)
                }
            }, function (response) {
                alert("Something went wrong..");
                return;
            });
    }


        //  TODO-----------add to favorites ???-------------------------------------


}]);


