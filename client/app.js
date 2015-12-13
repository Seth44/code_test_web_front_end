/**
 * Created by sethrauch on 12/12/15.
 */
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'LocalStorageModule',
    'appControllers',
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/suggestions', {
                templateUrl: 'templates/suggestions.html',
                controller: 'SuggestionsCtrl'
            }).
            when('/:categoryId/articles', {
                templateUrl: 'templates/articles.html',
                controller: 'ArticlesCtrl',
            }).
            when('/articles/:articleId', {
                templateUrl: 'templates/article.html',
                controller: 'ArticleCtrl',
            }).
            when('/', {
                templateUrl: 'templates/categories.html',
                controller: 'CategoryCtrl',
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
myApp.controller('AppCtrl', function AppCtrl($rootScope, $scope) {

});

