angular.module("parisApp")
.controller("indexController",['$rootScope','$window', function ($rootScope,$window) {
    self = this;
    $rootScope.username = "Guest";
    $rootScope.isLogin = false;

    self.logout=function(){
        $rootScope.username = "Guest";
        $rootScope.isLogin = false;
        $window.sessionStorage.removeItem("userToken");
    }
    
    // var xml = new XMLHttpRequest();
    // xml.open("GET", "./countries.xml", true);
    // //xml.send();
    // $rootScope.myXML=xml;
}]);