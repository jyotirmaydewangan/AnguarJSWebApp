
var dictionaryApp = angular.module('dictionaryApp', ['ngResource', 'ui.bootstrap', 'sidebarMenu'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});

dictionaryApp.factory('DictionaryResource', function ($resource) {
    return $resource('/api/word/:word/:lang', {}, {});
});

function DictionaryCtrl($scope, DictionaryResource) {

    $scope.DictionaryForm = {
        show: true,
        text: {}
    }

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

    $scope.other = {
        show: false
    }

    $scope.target = {
        show: false
    }

    $scope.synonym = {
        show: false
    }

    $scope.searchWord = function (word) {
        if (word != undefined) {
            $scope.synonym.show = false;
            $scope.target.show = false;
            $scope.noun.show = false;
            $scope.verb.show = false;
            $scope.adverb.show = false;
            $scope.adjective.show = false;
            $scope.other.show = false;

            DictionaryResource.get(word).$promise.then(function(result) {
                $scope.dictionary = result;
            });
        }
    }
}