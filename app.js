var app = angular.module('app', []);

app.service('articles', ['$http', function ($http) {
  this.getArticles = function (){
		return $http.get('http://localhost:3000/posts')
	};

  this.deleteArticle = function (id) {
    return $http.delete('http://localhost:3000/posts/' + id);
  };

	this.update = function (id, article) {
		return $http.put('http://localhost:3000/posts/' + id, article);
	};

  this.createArticle = function (article) {
    return $http.post('http://localhost:3000/posts', article);
  };
}])

app.controller('myCtrl', ['$scope', 'articles', function ($scope, articles) {
	articles.getArticles().success(function(data){
		$scope.articles = data;
	});

  $scope.hasUpdateError = false;
	$scope.updatedArticle = {};
	$scope.newArticle = {};

	$scope.delete = function(id){
    articles.deleteArticle(id).success(function (data) {
      console.log("Deleted: ", data);
    });
	};

	$scope.update = function(updatedArticle){
    articles.update($scope.updatedArticle.id, $scope.updatedArticle)
      .success(function (data) {
        console.log("Updated: ", data);
      })
      .error(function (data) {
        $scope.hasUpdateError = true;
      });
		$scope.updatedArticle = {};
	}

	$scope.create = function(){
    articles.createArticle($scope.newArticle).success(function (data) {
      console.log("Created: ", data);
    });
    $scope.newArticle = {};
	}
}])
