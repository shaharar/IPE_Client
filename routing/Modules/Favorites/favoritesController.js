angular.module("parisApp")
.controller("favoritesController", ['httpRequests', '$rootScope', '$window', '$route', '$scope', function (httpRequests,$rootScope,$window,$route,$scope) {
    var self = this;
    $scope.sortTypes = ['Default','Rank'];
    self.sortBy = 'Default';



    self.start=function(){
        self.getPoisInfo();
        // self.setPriorities();
        self.getCategories();
    }

    self.setSortType=function(){
        self.sortBy = self.sortType;
    }

    self.getPoisInfo=function(){
        var favoritePOIsId = $rootScope.favoritesList;
        console.log("favorites:")
        console.log(favoritePOIsId);
        self.POIsInfo = [];
        self.filteredPOIs = [];
        if (favoritePOIsId[0] == ""){
            alert("You currently don't have saved favorites")
        }
        else{
            for (var i = 0; i < favoritePOIsId.length; i++){

                httpRequests.get("POIs/getPOIByID/"+ favoritePOIsId[i])
                .then (function (response){
                    // favoritePOIsInfo.push(response.data);
                    var index = favoritePOIsId.indexOf(response.data.ID);
                    console.log(index);
                    self.POIsInfo[index] = response.data;
                    self.filteredPOIs[index] = response.data;
                    
                }, function(response){
                                 //------------TODO OPTIONAL handle error------------------------
        
                });
            }
        }
    }

    self.getPoiInfo=function(poiID){
        httpRequests.get("POIs/getPOIByID/"+poiID)
        .then (function (response){
            console.log("hellooo")
            self.name = response.data.Name;
            self.description = response.data.Description;
            self.usersWatching = response.data.UsersWatching;
            self.rank = response.data.Rank;
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
            // self.review1 = response.data.Review1;
            // self.review2 = response.data.Review2;
            self.picture = response.data.Picture;
        });
    }

    var move = function (origin, destination) {
        var temp = self.filteredPOIs[destination];
        self.filteredPOIs[destination] = self.filteredPOIs[origin];
        self.filteredPOIs[origin] = temp;
    };

    $scope.moveUp = function (index) {
        move(index, index - 1);
    };

    $scope.moveDown = function (index) {
        move(index, index + 1);
    };

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


    // self.setPriorities=function(){
    //     var priorities = [];
    //     for (var i = 0; i < $rootScope.favoritesList.length;i++){
    //         priorities.push(i + 1);
    //     }
    //     self.priorities = priorities;
    // }

    self.removeFromFavorites=function(poiID){
        var currFavoritesList = $rootScope.favoritesList;
        currFavoritesList.splice(currFavoritesList.indexOf(poiID),1);
        $window.sessionStorage.setItem("favorites",currFavoritesList);
        $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
        $route.reload();
    }

    self.saveChanges=function(){
        self.saveFavoritePOIs();
    }

    self.saveFavoritePOIs=function(){
        var favoritePOIsId = $rootScope.favoritesList;
        var IDs = [];
        var favoritePOIsPriorities = [];
        for(var i = 0; i < self.filteredPOIs.length; i++){
            IDs.push(self.filteredPOIs[i].ID);
            // favoritePOIsPriorities.push(i + 1);
        }
        for(var i = 0; i < IDs.length; i++){
            favoritePOIsPriorities.push(IDs.indexOf(favoritePOIsId[i]));
        }
        let favoritesDetails = {
            favorites : favoritePOIsId,
            priorities : favoritePOIsPriorities
        }
        httpRequests.post("POIs/private/saveFavoritePOIs", favoritesDetails) 
        .then (function (response){
            if (response.data.message == "Favorites list was updated"){
                alert("Changes were saved successfully");
                var updatedFavoritesList = [];
                for (var i = 0; i < self.filteredPOIs.length; i++){
                    updatedFavoritesList.push(self.filteredPOIs[i].ID);
                }
                $rootScope.favoritesList = updatedFavoritesList;
                $window.sessionStorage.removeItem("favorites");
                $window.sessionStorage.setItem("favorites",$rootScope.favoritesList);
            }
        }, function(response){
                             //------------TODO OPTIONAL handle error------------------------

        })
}


}]);