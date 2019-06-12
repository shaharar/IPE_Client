angular.module("parisApp")
.controller("indexController", function ($rootScope) {
    self = this;
    $rootScope.username = "Guest";
    $rootScope.isLogin = false;

    self.logout=function(){
        $rootScope.username = "Guest";
        $rootScope.isLogin = false;


    }
    
    // var xml = new XMLHttpRequest();
    // xml.open("GET", "./countries.xml", true);
    // //xml.send();
    // $rootScope.myXML=xml;
});