angular.module("parisApp")
.service('storageService', ['$window', function ($window) {

    this.getStorageRec = function(key) {
        return $window.sessionStorage.getItem(key);
    }

    this.remove = function(key) {
        return $window.sessionStorage.removeItem(key);
    }

    this.setStorage = function(key, value) {
        var recordValue = getStorageRec(key);
        if (!recordValue) {
            return $window.sessionStorage.setItem(key,value);
        }
        else {
            $window.sessionStorage.removeItem(key);
            $window.sessionStorage.setItem(key,value);
        }
    }
}])