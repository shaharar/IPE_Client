let app = angular.module('parisApp', ["ngRoute"]);
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        // .when('/', {
        //     templateUrl: 'Modules/Welcome/welcome.html',
        //     controller : 'welcomeController as welcmCtrl'
        // })
        // Welcome
        .when('/welcome', {
            templateUrl: 'Modules/Welcome/welcome.html',
            controller : 'welcomeController as welcmCtrl'
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