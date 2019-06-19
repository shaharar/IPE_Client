let app = angular.module('parisApp', ["ngRoute"]);
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'Modules/Welcome/welcome.html',
            controller : 'welcomeController as welcmCtrl'
        })
        // Welcome
        .when('/welcome', {
            templateUrl: 'Modules/Welcome/welcome.html',
            controller : 'welcomeController as welcmCtrl'
        })
        // Login
        .when('/login', {
            templateUrl: 'Modules/Login/login.html',
            controller : 'loginController as logCtrl'
        })
        // Register
        .when('/register', {
        templateUrl: 'Modules/Register/register.html',
        controller : 'registerController as regCtrl'
        })
        // About
        .when('/about', {
            templateUrl: 'Modules/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // Favorites
        .when('/favorites', {
            templateUrl: 'Modules/Favorites/favorites.html',
            controller : 'favoritesController as favCtrl'
        })
        // ALL POIs
        .when('/poi', {
            templateUrl: 'Modules/AllPois/allPois.html',
            controller : 'allPoisController as allPoisCtrl'
        })
        // POI INFO
        .when('/poi/id/:id?', {
            templateUrl: 'Modules/POI/poi.html',
            controller : 'poiController as poiCtrl'
        })
        // POI INFO
        .when('/poi/name/:name?', {
            templateUrl: 'Modules/POI/poi.html',
            controller : 'poiController as poiCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});