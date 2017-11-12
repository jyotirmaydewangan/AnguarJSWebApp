
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

    $scope.searchWord = function (word) {
        if (word != undefined) {

            DictionaryResource.get(word).$promise.then(function(result) {
                $scope.dictionary = result;
            });
        }
    }
}