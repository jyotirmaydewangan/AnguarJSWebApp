
var dictionaryApp = angular.module('dictionaryApp', ['ngResource', 'ui.bootstrap', 'sidebarMenu', 'pubnub.angular.service'], function ($dialogProvider) {
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


dictionaryApp.factory('AutocompleteResource', function ($resource) {
    return $resource('/api/wordList/:lang/:word', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function (data) {
                return JSON.parse(data);
            }
        }
    });
});


dictionaryApp.controller("titleCtrl", function($scope, Page) {
    $scope.Page = Page;
});


dictionaryApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

dictionaryApp.filter('transliteration', function() {
    return function(input) {
        return transl(input);
    }
});


dictionaryApp.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'), '<b>$1</b>')

        return $sce.trustAsHtml(text)
    }});

dictionaryApp.factory('ControllerSharingData', function(){
    return { source: '', target: '', finalHeader: ''};
});

dictionaryApp.controller("HeaderCtrl", ['$scope', 'ControllerSharingData', 'virtualKeyBoard', function($scope, ControllerSharingData, virtualKeyBoard) {
    $scope.HeaderData = ControllerSharingData;

    $scope.virtualKeyBoard = virtualKeyBoard;

    $scope.templates = {
        english :{ url: 'partials/keyboard/englishKeyboard.html' },
        hindi   :{ url: 'partials/keyboard/hindiKeyboard.html'},
        telugu  :{ url: 'partials/keyboard/teluguKeyboard.html'}
    };



    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };

    $scope.toggleCtrlState = function() {
        $scope.ctrlState = !$scope.ctrlState;
    };

    $scope.keyValue = function(str1, str2, str3, str4) {

        if(str1 == 'del' && str2 == 'del'){
            $scope.virtualKeyBoard.text = $scope.virtualKeyBoard.text.substring(0, $scope.virtualKeyBoard.text.length - 1);
        } else if ($scope.state && $scope.ctrlState) {
            $scope.virtualKeyBoard.text += str4;
        } else if ($scope.state && !$scope.ctrlState) {
            $scope.virtualKeyBoard.text += str2;
        } else if (!$scope.state && $scope.ctrlState) {
            $scope.virtualKeyBoard.text += str3;
        } else {
            $scope.virtualKeyBoard.text += str1;
        }

        $scope.virtualKeyBoard.fillTextBox($scope.virtualKeyBoard.text);
    };

    $scope.virtualKeyBoard.setKeyBoard = function (lang) {

        if(lang == 'english') {
            $scope.template = $scope.templates.english;
        } else if(lang == 'hindi') {
            $scope.template = $scope.templates.hindi;
        } else if (lang == 'telugu') {
            $scope.template = $scope.templates.telugu;
        } else {
            $scope.template = "";
        }
    };

}]);

dictionaryApp.service('virtualKeyBoard', function() {
    this.text = "";
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

dictionaryApp.controller('BrowseController', [ '$scope', '$location', '$routeParams', 'BrowseResource', 'ControllerSharingData', 'Page', 'virtualKeyBoard', function($scope, $location, $routeParams, BrowseResource, ControllerSharingData, Page, virtualKeyBoard) {

    $scope.char = $routeParams.char;
    $scope.source = $routeParams.source;
    $scope.target = $routeParams.target;
    $scope.page = $routeParams.page;

    $scope.HeaderData = ControllerSharingData;
    $scope.virtualKeyBoard = virtualKeyBoard;

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
            $scope.HeaderData.source = $scope.source;
            $scope.HeaderData.target = $scope.target;
            $scope.virtualKeyBoard.setKeyBoard($scope.source);

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
}]);

dictionaryApp.controller("DictionaryCtrl", ['$scope', '$http', '$rootScope', '$location', '$window', '$routeParams', 'DictionaryResource', 'ReverseDictionaryResource', 'AutocompleteResource', 'ControllerSharingData', 'Page', 'Pubnub', 'virtualKeyBoard', function($scope, $http, $rootScope, $location, $window, $routeParams,DictionaryResource, ReverseDictionaryResource, AutocompleteResource, ControllerSharingData, Page, Pubnub, virtualKeyBoard) {

    Page.setTitle($location.path().split("/")[2].replace(/-/g, ' ') + " meaning | xyz.com");

    $scope.DictionaryForm = {
        show: true,
        text: {}
    }

    $scope.virtualKeyBoard = virtualKeyBoard;

    $scope.virtualKeyBoard.fillTextBox = function (string) {
        $scope.DictionaryForm.text.word = string;
        $scope.complete($scope.DictionaryForm.text.word, $scope.DictionaryForm.text.lang);
    };

    $scope.DictionaryForm.text.word = $routeParams.word;

    $scope.virtualKeyBoard.text = $scope.DictionaryForm.text.word;

    $scope.HeaderData = ControllerSharingData;

    $scope.searchBoxWord = '';

    $scope.target = {
        show: false
    }
    $scope.definition = {
        show: false
    }
    $scope.example = {
        show: false
    }
    $scope.synonym = {
        show: false
    }
    $scope.antonym = {
        show: false
    }
    $scope.seeAlso = {
        show: false
    }

    $scope.$watch('updateHeader', function() {
        $scope.HeaderData.finalHeader = $scope.HeaderData.source + " to " + $scope.HeaderData.target + " Dictionary";
        $scope.virtualKeyBoard.setKeyBoard($scope.HeaderData.source);
    });

    $scope.searchWord = function (word) {

        if (word.word != undefined && $scope.searchBoxWord != word.word) {
            $scope.searchBoxWord = word.word;
            $scope.virtualKeyBoard.text = word.word;
            $scope.target.show = false;
            $scope.definition.show = false;
            $scope.example.show = false;
            $scope.synonym.show = false;
            $scope.antonym.show = false;
            $scope.seeAlso.show = false;

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
    };

    $scope.searchReverseWord = function (word) {

        if (word.word != undefined && $scope.searchBoxWord != word.word) {
            $scope.searchBoxWord = word.word;

            $scope.target.show = false;
            $scope.definition.show = false;
            $scope.example.show = false;
            $scope.synonym.show = false;
            $scope.antonym.show = false;
            $scope.seeAlso.show = false;

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
    };


    $scope.complete = function (word, lang) {
        var output = [];
        $scope.hideAutoCompleteList = false;

        var paramForm = {};
        paramForm.lang = lang;
        paramForm.word = word;

        $scope.virtualKeyBoard.text = word;

        AutocompleteResource.query(paramForm, function (response) {
            angular.forEach(response, function (item) {
                if (item) {
                    output.push(item.word);
                }
            });
        });

        $scope.filterWords = output;
    };
    
    $scope.fillTextBox = function (string) {
        $scope.DictionaryForm.text.word = string;
        $scope.virtualKeyBoard.text = string;
        $scope.hideAutoCompleteList = true;
    };


    $scope.sayIt = function (string, language) {

        var langList = ["hi-IN", "en-GB"];

        if(langList.indexOf(language) === -1) {
            string = slugify(string);
            language = "hi-IN";
            console.log(string);
        }

        var speech = new SpeechSynthesisUtterance(string);

        speech.volume = 1; // 0 to 1
        speech.rate = 1; // 0.1 to 10
        speech.pitch = 1; //0 to 2
        speech.lang = language;

        window.speechSynthesis.speak(speech);
    };

}]);



