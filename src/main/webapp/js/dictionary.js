
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

function DictionaryCtrl($scope, $routeParams, DictionaryResource, ReverseDictionaryResource) {

    $scope.DictionaryForm = {
        show: true,
        text: {}
    }

    $scope.DictionaryForm.text.word = $routeParams.word;

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
        if (word != undefined) {
            $scope.searchBoxWord = $scope.DictionaryForm.text.word;
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

            DictionaryResource.get(word).$promise.then(function(result) {
                $scope.dictionary = result;
            });
        }
    }

    $scope.searchReverseWord = function (word) {
        if (word != undefined) {
            $scope.searchBoxWord = $scope.DictionaryForm.text.word;
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

            ReverseDictionaryResource.get(word).$promise.then(function(result) {
                $scope.dictionary = result;
            });
        }
    }
}