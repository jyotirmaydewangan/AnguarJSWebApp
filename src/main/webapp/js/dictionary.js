
var dictionaryApp = angular.module('dictionaryApp', ['ngResource', 'ui.bootstrap', 'sidebarMenu'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});

dictionaryApp.factory('DictionaryResource', function ($resource) {
    return $resource('/api/word/:word/:lang', {}, {});
});

dictionaryApp.factory('ReverseDictionaryResource', function ($resource) {
    return $resource('/api/reverseWord/:word/:lang', {}, {});
});

dictionaryApp.factory('BrowseResource', function ($resource) {
    return $resource('/api/wordList/:lang/:char/:page', {}, {});
});

dictionaryApp.factory('Page', function(){
    var title = 'default';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
});

dictionaryApp.controller("titleCtrl", function($scope, Page) {
    $scope.Page = Page;
});


dictionaryApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

dictionaryApp.factory('ControllerSharingData', function(){
    return { source: '', target: '', finalHeader: ''};
});

dictionaryApp.controller("HeaderCtrl", function($scope, ControllerSharingData) {
    $scope.HeaderData = ControllerSharingData;
});


dictionaryApp.controller('DetailController', function($scope, $location, ControllerSharingData, Page) {

    $scope.HeaderData = ControllerSharingData;

    $scope.$watch('updateBrowse', function() {

        if($location.path().substr(1) == "privacy") {
            $scope.HeaderData.finalHeader = "";
            Page.setTitle("privacy policy | xyz.com");
        } else if($location.path().substr(1) == "terms") {
            $scope.HeaderData.finalHeader = "";
            Page.setTitle("terms of Use | xyz.com");
        } else if($location.path().substr(1) == "about") {
            $scope.HeaderData.finalHeader = "";
            Page.setTitle("about us | xyz.com");
        } else if($location.path().substr(1) == "home") {
            $scope.HeaderData.finalHeader = "";
            Page.setTitle("home");
        }
    });
});

dictionaryApp.controller('BrowseController', function($scope, $location, $routeParams, BrowseResource, ControllerSharingData, Page) {

    $scope.char = $routeParams.char;
    $scope.source = $routeParams.source;
    $scope.target = $routeParams.target;
    $scope.page = $routeParams.page;

    $scope.HeaderData = ControllerSharingData;

    if($scope.target != undefined) {
        Page.setTitle($scope.source + " to "+ $scope.target + " dictionary | xyz.com");
    } else {
        Page.setTitle("List of Dictionary | xyz.com");
    }

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.$watch('updateBrowse', function() {

        if($scope.target != undefined) {
            $scope.HeaderData.finalHeader = $scope.source + " to " + $scope.target + " dictionary";
            var paramForm  = {};
            paramForm.char = $scope.char;
            paramForm.page = $scope.page;
            paramForm.lang = $scope.source;
            BrowseResource.get(paramForm).$promise.then(function(result) {
                $scope.filteredWords = result.wordList;
                $scope.pageCount     = result.pageCount;
                $scope.letters       = result.letters;
            });
        } else {
            //$scope.HeaderData.finalHeader = "Browse dictionary";
        }
    });
});

dictionaryApp.controller("DictionaryCtrl", function($scope, $rootScope, $location, $window, $routeParams, DictionaryResource, ReverseDictionaryResource, ControllerSharingData, Page) {

    Page.setTitle($location.path().split("/")[2].replace(/-/g, ' ') + " meaning | xyz.com");

    $scope.DictionaryForm = {
        show: true,
        text: {}
    }

    $scope.DictionaryForm.text.word = $routeParams.word;

    $scope.HeaderData = ControllerSharingData;

    $scope.searchBoxWord = '';
    $scope.noun = {
        show: false
    }
    $scope.verb = {
        show: false
    }
    $scope.adverb = {
        show: false
    }
    $scope.adjective = {
        show: false
    }
    $scope.preposition = {
        show: false
    }
    $scope.conjunction = {
        show: false
    }
    $scope.pronoun = {
        show: false
    }
    $scope.interjection = {
        show: false
    }
    $scope.phrase = {
        show: false
    }
    $scope.abbreviation = {
        show: false
    }
    $scope.article = {
        show: false
    }
    $scope.auxiliaryVerb = {
        show: false
    }
    $scope.particle = {
        show: false
    }
    $scope.prefix = {
        show: false
    }
    $scope.other = {
        show: false
    }
    $scope.target = {
        show: false
    }
    $scope.synonym = {
        show: false
    }
    $scope.otherMeaning = {
        show: false
    }
    $scope.example = {
        show: false
    }

    $scope.$watch('updateHeader', function() {
        $scope.HeaderData.finalHeader = $scope.HeaderData.source + " to " + $scope.HeaderData.target + " Dictionary";
    });

    $scope.searchWord = function (word) {

        if (word.word != undefined) {
            $scope.searchBoxWord = word.word;
            $scope.synonym.show = false;
            $scope.target.show = false;
            $scope.noun.show = false;
            $scope.verb.show = false;
            $scope.adverb.show = false;
            $scope.adjective.show = false;
            $scope.other.show = false;
            $scope.example.show = false;
            $scope.preposition.show = false;
            $scope.conjunction.show = false;
            $scope.pronoun.show = false;
            $scope.interjection.show = false;
            $scope.phrase.show = false;
            $scope.abbreviation.show = false;
            $scope.article.show = false;
            $scope.auxiliaryVerb.show = false;
            $scope.particle.show = false;
            $scope.prefix.show = false;

            $scope.HeaderData.source = 'english';
            $scope.HeaderData.target = word.lang;

            Page.setTitle(word.word + " definition in " + word.lang + " - "
                + word.word + " in " + word.lang + " - "
                + word.word + " meaning in " + word.lang
                + " | xyz.com");

            if(word.word != undefined && $location.path().indexOf('/'+ word.word + '/') === -1) {
                $location.url("/english-word/" + word.word + "/meaning-in-" + word.lang);
            } else {
                DictionaryResource.get(word).$promise.then(function(result) {
                    $scope.dictionary = result;
                });
                $window.ga('set', 'page', $location.path());
                $window.ga('send', 'pageview',{'title': Page.title()});
            }
        }
    }

    $scope.searchReverseWord = function (word) {

        if (word.word != undefined) {

            $scope.searchBoxWord = word.word;
            $scope.synonym.show = false;
            $scope.target.show = false;
            $scope.noun.show = false;
            $scope.verb.show = false;
            $scope.adverb.show = false;
            $scope.adjective.show = false;
            $scope.other.show = false;
            $scope.example.show = false;
            $scope.preposition.show = false;
            $scope.conjunction.show = false;
            $scope.pronoun.show = false;
            $scope.interjection.show = false;
            $scope.phrase.show = false;
            $scope.abbreviation.show = false;
            $scope.article.show = false;
            $scope.auxiliaryVerb.show = false;
            $scope.particle.show = false;
            $scope.prefix.show = false;

            $scope.HeaderData.source = word.lang;
            $scope.HeaderData.target = 'english';

            Page.setTitle(word.word + " definition in english - "
                + word.word + " in english - "
                + word.word + " meaning in english"
                + " | xyz.com");

            if(word.word != undefined && $location.path().indexOf('/'+ word.word + '/') === -1) {
                $location.url("/" + word.lang + "-word/" + word.word + "/meaning-in-english");
            } else {
                ReverseDictionaryResource.get(word).$promise.then(function(result) {
                    $scope.dictionary = result;
                });
                $window.ga('set', 'page', $location.path());
                $window.ga('send', 'pageview',{'title': Page.title()});
            }
        }
    }
});