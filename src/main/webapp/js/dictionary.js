
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


dictionaryApp.filter('description', function() {
    return function(input) {

        switch(input) {
            case "hyponym" :
                text = "A word that is more specific than a given word.";
                break;
            case "hypernym" :
                text = "A word that is more generic than a given word.";
                break;
            case "part holonym" :
                text = "A word that names the whole of which a given word is a part.";
                break;
            case "domain member category" :
                text = input;
                break;
            case "substance holonym" :
                text = input;
                break;
            case "part meronym" :
                text = "A word that names a part of a larger whole.";
                break;
            case "domain category" :
                text = input;
                break;
            case "member meronym" :
                text = input;
                break;
            case "instance hyponym" :
                text = input;
                break;
            case "attribute" :
                text = input;
                break;
            case "domain usage" :
                text = input;
                break;
            case "instance hypernym" :
                text = input;
                break;
            case "domain region" :
                text = input;
                break;
            case "member holonym" :
                text = input;
                break;
            case "domain member usage" :
                text = input;
                break;
            case "substance meronym" :
                text = input;
                break;
            case "domain member region" :
                text = input;
                break;
            case "verb group" :
                text = input;
                break;
            case "entail" :
                text = input;
                break;
            case "cause" :
                text = input;
                break;
            case "also" :
                text = input;
                break;
            case "similar" :
                text = input;
                break;
            case "pertainym" :
                text = input;
                break;
            case "antonym" :
                text = input;
                break;
            case "derivation" :
                text = input;
                break;
            case "also" :
                text = input;
                break;
            case "domain usage" :
                text = input;
                break;
            case "domain region" :
                text = input;
                break;
            case "domain member usage" :
                text = input;
                break;
            case "participle" :
                text = input;
                break;
            case "verb group" :
                text = input;
                break;
            case "domain member category" :
                text = input;
                break;
            case "domain member region" :
                text = input;
                break;
            case "domain category" :
                text = input;
                break;
            default:
                text = "default";
        }


        return text;
    }
});

function DictionaryCtrl($scope, $routeParams, DictionaryResource, ReverseDictionaryResource) {

    $scope.roles = ["derivation", "hypernym", "hyponym", "holonym",
                    "meronym", "also", "similar", "antonym"];

    $scope.relatedByFilter = function(role){
        var indexOfRole = $scope.roles.indexOf(role); // or whatever your object is instead of $scope.roles
        if (indexOfRole === -1)
            return false;
        else
            return true;
    }

    $scope.DictionaryForm = {
        show: true,
        text: {}
    }

    $scope.DictionaryForm.text.word = $routeParams.word;
    $scope.searchBoxWord = '';
    $scope.targetLang = '';

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