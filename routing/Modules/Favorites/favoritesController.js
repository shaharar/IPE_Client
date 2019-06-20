angular.module("parisApp")
.controller("favoritesController", ['httpRequests', '$rootScope', '$window', '$route', '$scope', function (httpRequests,$rootScope,$window,$route,$scope) {
    var self = this;
    $scope.sortTypes = ['Rank', 'ID', 'Prefrences'];



    self.start=function(){
        self.getPoisInfo();
        self.setPriorities();
        self.getCategories();
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
            self.filteredPOIs = [];
          
        }
     

    }

    self.getCategories=function(){  
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
            self.chosenCategories = [];
            for (var i = 0; i < self.categories.length; i++){
                self.chosenCategories.push(""+self.categories[i].ID)
            }
        }, function(response){
             //------------TODO OPTIONAL handle error------------------------
        });
    }

    self.chooseCategories=function (category,event) {
        var idx = self.chosenCategories.indexOf(""+category);
        if(!event.target.checked && idx != -1){
            self.chosenCategories.splice(idx,1);
        }
        else if(event.target.checked && idx == -1){
            self.chosenCategories.push(""+category);
        }
        self.filteredPOIs = [];
        for (var i = 0; i < self.POIsInfo.length; i++){
            var index = self.chosenCategories.indexOf(self.POIsInfo[i].CategoryID);
            if( index != -1){
                self.filteredPOIs.push(self.POIsInfo[i]);
            }
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