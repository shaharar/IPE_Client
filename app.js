let app = angular.module('ParisApp', ["ngRoute"]);
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
        
        })
        // About
        .when('/about', {
            templateUrl: 'Modules/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // POI
        .when('/poi', {
            templateUrl: 'Modules/POI/poi.html',
            controller : 'poiController as poiCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});