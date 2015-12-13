describe('isArticleRead', function () {
    var $scope, ctrl, $localStorageService;

    beforeEach(module('myApp'));

    beforeEach(inject(function ($rootScope, $controller, _localStorageService_) {
        $localStorageService = _localStorageService_;

        $scope = $rootScope.$new();
        ctrl = $controller('ArticleCtrl', {$scope: $scope});
    }));

    it('test if article has been read/viewed', inject(function ($controller) {
        var $scope = {},
            ctrl = $controller('ArticleCtrl', {$scope: $scope});
        $scope.articleId = 1;
        $localStorageService.remove($scope.articleId);
        $localStorageService.set($scope.articleId, true);
        $scope.checkIfUserReadArticle();

        expect($scope.hasRead).toBeTruthy();
    }));
});

describe('CategoryCtrl', function() {
    var $scope, ctrl, $httpBackend;

    beforeEach(module('myApp'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/categories').
            respond([{id: '1', title: 'Politics'}, {id: '2', title: 'Food'}]);

        $scope = $rootScope.$new();
        ctrl = $controller('CategoryCtrl', {$scope: $scope});
    }));


    it('should create "categories" model with 2 categories fetched from xhr', function() {
        $httpBackend.flush();

        expect($scope.categories.length).toBe(2);
    });
});

