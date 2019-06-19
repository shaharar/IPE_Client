angular.module("parisApp")
.controller("favoritesController", ['httpRequests', '$rootScope', '$window',  function (httpRequests,$rootScope,$window) {
    var self = this;

    self.start=function(){
        self.getPoisInfo();
    }

    self.getPoisInfo=function(){
        var favoritePOIsInfo = [];
        var favoritePOIsId = $rootScope.favoritesList;
        for (var i = 0; i < favoritePOIsId.length; i++){
            console.log("POIs/getPOIByID/"+ favoritePOIsId[i]);
            httpRequests.get("POIs/getPOIByID/"+ favoritePOIsId[i])
            .then (function (response){
                favoritePOIsInfo.push(response.data);
            }, function(response){
                             //------------TODO OPTIONAL handle error------------------------
    
            });
        }
        self.POIsInfo = favoritePOIsInfo;
    }

    self.removeFromFavorites=function(poiID){
        var currFavoritesList = $rootScope.favoritesList;
        currFavoritesList.splice(currFavoritesList.indexOf(poiID),1);
        $window.sessionStorage.setItem("favorites",currFavoritesList);
        $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
        console.log($rootScope.favoritesList);
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


}]);