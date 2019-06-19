angular.module("parisApp")
.controller("favoritesController", ['httpRequests', '$rootScope', '$window', '$route', '$scope', function (httpRequests,$rootScope,$window,$route,$scope) {
    var self = this;
    $scope.sortTypes = ['Rank', 'ID', 'Prefrences'];



    self.start=function(){
        self.getPoisInfo();
        self.setPriorities();
    }

    self.setSortType=function(){
        self.sortBy = self.sortType;
        console.log(self.sortBy);
    }

    self.getPoisInfo=function(){
        var favoritePOIsInfo = [];
        var favoritePOIsId = $rootScope.favoritesList;
        if (favoritePOIsId[0] == ""){
            alert("You currently don't have saved favorites")
        }
        else{
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
     

    }

    self.setPriorities=function(){
        var priorities = [];
        for (var i = 0; i < $rootScope.favoritesList.length;i++){
            priorities.push(i + 1);
        }
        self.priorities = priorities;
    }

    self.removeFromFavorites=function(poiID){
        var currFavoritesList = $rootScope.favoritesList;
        currFavoritesList.splice(currFavoritesList.indexOf(poiID),1);
        $window.sessionStorage.setItem("favorites",currFavoritesList);
        $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
        $route.reload();
        console.log($rootScope.favoritesList);
    }

    self.saveChanges=function(){
        self.saveFavoritePOIs();
    }

    self.saveFavoritePOIs=function(){
        var favoritePOIsId = $rootScope.favoritesList;
        var favoritePOIsPriorities = [];
        for(var i = 0; i < favoritePOIsId.length; i++){
            favoritePOIsPriorities.push(i + 1);
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