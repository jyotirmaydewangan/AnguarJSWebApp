
var dictionaryApp = angular.module('dictionaryApp', ['ngResource', 'ui.bootstrap', 'sidebarMenu'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});


dictionaryApp.factory('DictionaryResource', function ($resource) {
    return $resource('/api/word/:word/:lang', {}, {});
});

dictionaryApp.factory('ReverseDictionaryResource', function ($resource) {
    return $resource('/api/reverseWord/:word/:lang', {}, {});
});


dictionaryApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

dictionaryApp.factory('ControllerSharingData', function(){
    return { source: '', target: ''};
});

dictionaryApp.controller("headerCtrl", function($scope, ControllerSharingData) {
    $scope.HeaderData = ControllerSharingData;
});

dictionaryApp.controller("DictionaryCtrl", function($scope, $location,$routeParams, DictionaryResource, ReverseDictionaryResource, ControllerSharingData) {

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

            if(word.word != undefined && $location.path().indexOf('/'+ word.word + '/') === -1) {
                $location.url("/english-word/" + word.word + "/meaning-in-" + word.lang);
            } else {
                DictionaryResource.get(word).$promise.then(function(result) {
                    $scope.dictionary = result;
                });
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

            if(word.word != undefined && $location.path().indexOf('/'+ word.word + '/') === -1) {
                $location.url("/" + word.lang + "-word/" + word.word + "/meaning-in-english");
            } else {
                ReverseDictionaryResource.get(word).$promise.then(function(result) {
                    $scope.dictionary = result;
                });
            }
        }
    }
});