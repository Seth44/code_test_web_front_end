var appControllers = angular.module('appControllers', []);

appControllers.controller('CategoryCtrl', function CategoryCtrl($rootScope, $scope, $http) {

    $http.get('/api/categories').success(function (data) {
        $scope.categories = data;
    });
})


appControllers.controller('ArticlesCtrl', function ArticlesCtrl($rootScope, $scope, $routeParams, $http) {
    $scope.categoryId = $routeParams.categoryId;

    $http.get('/api/categories/ ' + $scope.categoryId + '/articles').success(function(data) {
        $scope.articles = data;

        if (data) {
            $scope.category = data[0].category.title;
        }
    });
});

appControllers.controller('ArticleCtrl', function ArticlesCtrl($rootScope, $scope, $routeParams, $http, $sce, localStorageService) {
    $scope.articleId = $routeParams.articleId;
    $scope.hasRead = false;

    $http.get('/api/articles/' + $scope.articleId).success(function(data) {
        $scope.article = data;
        //need to bypass sanitize-ing the html
        $scope.article.content = $sce.trustAsHtml($scope.article.content);

        $scope.checkIfUserReadArticle();
    });

    $scope.checkIfUserReadArticle = function() {
        $scope.hasRead = localStorageService.get($scope.articleId)

        if (!$scope.hasRead) {
            $scope.hasRead = false;
            localStorageService.set($scope.articleId, true);
        }
    }

});

appControllers.controller('SuggestionsCtrl', function SuggestionsCtrl($rootScope, $scope, $http) {
    $scope.suggestion = {};
    $scope.displaySuccessMessage = false;

    $scope.submitSuggestion = function(suggestion) {

        $http.post('/api/suggestions', suggestion).then(function successCallback(response) {
            $scope.displaySuccessMessage = true;
        }, function errorCallback(response) {

        });
    }

});