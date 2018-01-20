var sidebarMenu = angular.module('sidebarMenu', ['ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        // browser reload doesn't work when html5 mode is turned on..
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/partials/englishToHindi.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-hindi', {templateUrl : '/partials/englishToHindi.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-urdu', {templateUrl : '/partials/englishToUrdu.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-telugu', {templateUrl : '/partials/englishToTelugu.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-bengali', {templateUrl : '/partials/englishToBengali.html', controller:'DictionaryCtrl'})


            .when('/dictionary/hindi-to-english', {templateUrl : '/partials/hindiToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/urdu-to-english', {templateUrl : '/partials/urduToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/telugu-to-english', {templateUrl : '/partials/teluguToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/bengali-to-english', {templateUrl : '/partials/bengaliToEnglish.html', controller:'DictionaryCtrl'})


            .when('/english-word/:word/meaning-in-hindi', {templateUrl : '/partials/englishToHindi.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-urdu', {templateUrl : '/partials/englishToUrdu.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-telugu', {templateUrl : '/partials/englishToTelugu.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-bengali', {templateUrl : '/partials/englishToBengali.html', controller:'DictionaryCtrl'})


            .when('/hindi-word/:word/meaning-in-english', {templateUrl : '/partials/hindiToEnglish.html', controller:'DictionaryCtrl'})
            .when('/urdu-word/:word/meaning-in-english', {templateUrl : '/partials/urduToEnglish.html', controller:'DictionaryCtrl'})
            .when('/telugu-word/:word/meaning-in-english', {templateUrl : '/partials/teluguToEnglish.html', controller:'DictionaryCtrl'})
            .when('/bengali-word/:word/meaning-in-english', {templateUrl : '/partials/bengaliToEnglish.html', controller:'DictionaryCtrl'})


            .otherwise({redirectTo: '/'});
        $locationProvider.hashPrefix("!")
    });

sidebarMenu.controller("MenuCtrl", function ($scope, $location, Menu) {
    $scope.menu = Menu;

    /*
     See: http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
     */
    $scope.getClass = function (item) {
        //console.log("location.path=" + $location.path())
        //console.log("item.href=" + item.href)
        //if ($location.path() == item.href) {
        if ($location.path() == item.href) {
            return "active"
        } else {
            return ""
        }
    }
});

sidebarMenu.directive("menu", function () {
    return {
        restrict: "A",
        template: '<ul class="nav nav-list">' +
            '<li class="nav-header">Dictionary</li>' +
            '<li ng-repeat="item in menu.items" ng-class="getClass(item)"><a href="{{item.href}}">{{item.name}}</a></li>' +
            '</ul>'
    };
});

sidebarMenu.factory('Menu', function () {
    var Menu = {};
    Menu.items = [
        {
            class: "",
            href: "/#!/dictionary/english-to-hindi",
            name: "English to Hindi"
        },
        {
            class: "",
            href: "/#!/dictionary/english-to-urdu",
            name: "English to Urdu"
        },
        {
            class: "",
            href: "/#!/dictionary/english-to-telugu",
            name: "English to Telugu"
        },
        {
            class: "",
            href: "/#!/dictionary/english-to-bengali",
            name: "English to Bengali"
        }
    ];
    return Menu;
});

