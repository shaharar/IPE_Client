angular.module("parisApp")
.service('authentication', ['$rootScope', function ($rootScope) {

    this.setCurrUser = function(currUser) {
        $rootScope.username = currUser.Username;
        $rootScope.isLogin = true;
    }
}])
