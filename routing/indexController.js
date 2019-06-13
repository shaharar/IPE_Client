angular.module("parisApp")
.controller("indexController", function ($rootScope) {
    console.log("enter index controller")
    self = this;
    $rootScope.username = "Guest";
    $rootScope.isLogin = true;

    self.logout=function(){
        console.log("enter logout")
        $rootScope.username = "shahar";
        $rootScope.isLogin = false;


    }
    
    // var xml = new XMLHttpRequest();
    // xml.open("GET", "./countries.xml", true);
    // //xml.send();
    // $rootScope.myXML=xml;
});