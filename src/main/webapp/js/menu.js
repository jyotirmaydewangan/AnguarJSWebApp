var sidebarMenu = angular.module('sidebarMenu', ['ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        // browser reload doesn't work when html5 mode is turned on..
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/browse', {templateUrl: '/partials/browse.html', controller:'BrowseController'})
            .when('/', {templateUrl: '/partials/home.html', controller:'DetailController'})
            .when('/home', {templateUrl: '/partials/home.html', controller:'DetailController'})
            .when('/about', {templateUrl: '/partials/about.html', controller:'DetailController'})
            .when('/terms', {templateUrl: '/partials/terms.html', controller:'DetailController'})
            .when('/privacy', {templateUrl: '/partials/privacy.html', controller:'DetailController'})

            .when('/browse/:char/:source/:target/:page', {templateUrl: '/partials/browseLanguage.html', controller:'BrowseController'})

            .when('/dictionary/english-to-hindi', {templateUrl : '/partials/englishToHindi.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-urdu', {templateUrl : '/partials/englishToUrdu.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-telugu', {templateUrl : '/partials/englishToTelugu.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-bengali', {templateUrl : '/partials/englishToBengali.html', controller:'DictionaryCtrl'})
            .when('/dictionary/english-to-marathi', {templateUrl : '/partials/englishToMarathi.html', controller:'DictionaryCtrl'})


            .when('/dictionary/hindi-to-english', {templateUrl : '/partials/hindiToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/urdu-to-english', {templateUrl : '/partials/urduToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/telugu-to-english', {templateUrl : '/partials/teluguToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/bengali-to-english', {templateUrl : '/partials/bengaliToEnglish.html', controller:'DictionaryCtrl'})
            .when('/dictionary/marathi-to-english', {templateUrl : '/partials/marathiToEnglish.html', controller:'DictionaryCtrl'})

            .when('/english-word/:word/meaning-in-hindi', {templateUrl : '/partials/englishToHindi.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-urdu', {templateUrl : '/partials/englishToUrdu.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-telugu', {templateUrl : '/partials/englishToTelugu.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-bengali', {templateUrl : '/partials/englishToBengali.html', controller:'DictionaryCtrl'})
            .when('/english-word/:word/meaning-in-marathi', {templateUrl : '/partials/englishToMarathi.html', controller:'DictionaryCtrl'})


            .when('/hindi-word/:word/meaning-in-english', {templateUrl : '/partials/hindiToEnglish.html', controller:'DictionaryCtrl'})
            .when('/urdu-word/:word/meaning-in-english', {templateUrl : '/partials/urduToEnglish.html', controller:'DictionaryCtrl'})
            .when('/telugu-word/:word/meaning-in-english', {templateUrl : '/partials/teluguToEnglish.html', controller:'DictionaryCtrl'})
            .when('/bengali-word/:word/meaning-in-english', {templateUrl : '/partials/bengaliToEnglish.html', controller:'DictionaryCtrl'})
            .when('/marathi-word/:word/meaning-in-english', {templateUrl : '/partials/marathiToEnglish.html', controller:'DictionaryCtrl'})

            .otherwise({redirectTo: '/'});
            //$locationProvider.hashPrefix("!");
    });