angular.module("parisApp")
.controller("indexController",['$rootScope','$window', function ($rootScope,$window) {
    self = this;
   
    self.start=function(){
        if($window.sessionStorage.getItem("userToken") == null){
            $rootScope.username = "Guest";
            $rootScope.isLogin = false;
            $rootScope.favoritesList = [];
        }
        else{
            $rootScope.username = $window.sessionStorage.getItem("username");
            $rootScope.isLogin = true;
            $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
        }    
    }

    self.logout=function(){
        $rootScope.username = "Guest";
        $rootScope.isLogin = false;
        $window.sessionStorage.removeItem("userToken");
        $window.sessionStorage.removeItem("username");
    }
    
    var xml = new XMLHttpRequest();
    xml.open("GET", "./countries.xml", true);
    xml.send();
    $rootScope.myXML=xml;
}]);