angular.module("parisApp")
.controller("indexController", function ($scope) {
    self = this;
    $scope.username = "Guest";
    $scope.isLogin = false;

    self.logout=function(){
        $scope.username = "Guest";
        $scope.isLogin = false;


    }
    
    var xml = new XMLHttpRequest();
    xml.open("GET", "./countries.xml", true);
    // xml.send();
    $scope.myXML=xml;
});