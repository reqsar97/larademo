
angular.module('app.controllers', [
	  'ngRoute',
]).controller('appController', function($scope, $http, $location){

	$scope.checkAuth = function(){
		$scope.userName = localStorage.getItem('name');
		if(localStorage.getItem('isLogged') == 1){
			return true;
		}
		return false;
	};

	$scope.checkGuest = function () {
		if(localStorage.getItem('isLogged') == 0){
			return true;
		}
		return false;
	}

	$scope.logout = function(){
		var data = {
			token: localStorage.getItem('token')
		}
		$http.post('/api/logout', data)
    .then(function successCallback(response) {
			localStorage.clear();
			localStorage.setItem('isLogged', 0);
			$location.path('/');
    }, function errorCallback(response) {
      console.log(response);
    });
	}
}).controller('LoginController', function($scope, $http, $location){
    $scope.login = function(user) {
	    $http.post('/api/login', user)
	    .then(function successCallback(response) {
	      var data = response.data.resourse;
				localStorage.setItem('token', data.token);
				localStorage.setItem('name', data.name);
				localStorage.setItem('isLogged', 1);
				$location.path('/');
	    }, function errorCallback(response) {
	      console.log(response);
	    });
    }
}).controller('RegisterController', function($scope, $http, $location){

	  $scope.name = "Bob";
		$scope.register = function(inputs) {
			console.log(inputs);
			$http.post('/api/register', inputs)
	    .then(function successCallback(response) {
	      var data = response.data.resourse;
				$location.path('/login');
	    }, function errorCallback(response) {
	      console.log(response);
	    });
		}
}).controller('sidebarController', function($scope, $http){

		function getAllCategories() {
			$http.get('/api/categories')
			 .then(function (response) {
				 var data = response.data.resource;
				 $scope.sidebarData = data;
			 }, function (error) {
			 	console.log(error);
			});
		}
		getAllCategories();
		$scope.$on('categoriesChanged', function (event, data) {
			getAllCategories();
		});
}).controller('postsByCategoryController', function($scope,$http, $routeParams) {
		var id = $routeParams.id;
		$http.get('/api/posts/categories/'+id)
		 .then(function (response) {
			 var data = response.data.resource.posts.data;
			 $scope.postsByCategory = data;
		 }, function (error) {
		 	console.log(error);
		 })
}).controller('allPostsController', function($scope, $http){
		$http.get('/api/posts')
		 .then(function (response) {
			 var data = response.data.resource.posts.data;
			 $scope.allPosts = data;
		 }, function (error) {
			console.log(error);
		})
}).controller('singlePostController', function($scope, $http, $routeParams){
		var id = $routeParams.id;
		$http.get('/api/posts/'+id)
		 .then(function (response) {
			 var data = response.data.resource.post;
			 $scope.post = data;
		 }, function (error) {
			console.log(error);
		 })
}).controller('userPostsController', function($scope, $http) {
		var token = {
			params: {
				token:localStorage.getItem('token')
			}
		}

		function getUserPosts() {
			$http.get('/api/me/posts', token)
			 .then(function (response) {
				 var data = response.data.resource.posts.data;
				 $scope.userPosts = data;
			 }, function (error) {
				console.log(error);
			 })
		}
		getUserPosts();
}).controller('userCategoriesController', function($scope, $http, $location, $rootScope){
		var token = {
			params: {
				token:localStorage.getItem('token')
			}
		}
		function getUserCategories(){
			$http.get('/api/me/categories', token)
			 .then(function (response) {
				 var data = response.data.resource.categories;
				 $scope.userCategories = data;
			 }, function (error) {
				console.log(error);
			});
		}
		getUserCategories();
		//delete category
		$scope.deleteCategory = function(id) {
			var token = {
				params: {
					token:localStorage.getItem('token')
				}
			}
			$http.delete('/api/categories/'+id, token)
			 .then(function (response) {
				 getUserCategories();
				 $rootScope.$broadcast('categoriesChanged');

			 }, function (error) {
				console.log(error);
			});
		}
}).controller('createCategoryController', function ($scope, $http, $location,$rootScope) {
		$scope.createCategory = function (inputs) {
			inputs.token = localStorage.getItem('token');
			$http.post('/api/categories', inputs)
	    .then(function successCallback(response) {
	      var data = response.data.resourse;
				$rootScope.$broadcast('categoriesChanged');
				$location.path('/me/categories');
	    }, function errorCallback(response) {
	      console.log(response);
	    });
		}
}).controller('updateCategoryController', function($scope, $http,$location,$rootScope, $routeParams) {
		id = $routeParams.id;

		$scope.updateCategory = function(inputs) {
			inputs.token = localStorage.getItem('token');
			console.log(inputs);

			$http.put('/api/categories/'+id, inputs)
			.then(function successCallback(response) {
				var data = response.data.resourse;
				$rootScope.$broadcast('categoriesChanged');
				$location.path('/me/categories');
			}, function errorCallback(response) {
				console.log(response);
			});
		}
}).controller('createPostController', function($scope, $http, $location) {
		var data;
		$http.get('/api/categories')
		 .then(function (response) {
			 data = response.data.resource.categories;
			 $scope.categories = data;
			 $scope.sidebarData = data;
		 }, function (error) {
			console.log(error);
		});
		$scope.createPost = function(inputs) {
			inputs.token = localStorage.getItem('token');
			inputs.image = $scope.myFile;
			let data = new FormData();
			data.append('token', localStorage.getItem('token'));
			data.append('title', inputs.name);
			data.append('body', inputs.body);
			data.append('category_id', inputs.category_id);
			data.append('image', inputs.image);

			console.log(inputs);
			$http.post('/api/posts',data,{
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
			})
				.then(function (response) {
		 			$location.path('/me/posts')

		 	 	}, function (error) {
			 		console.log(error);
			 	});
		}

}).controller('updatePostController', function($scope, $http, $routeParams, $location) {
		var data;
		$http.get('/api/categories')
		 .then(function (response) {
			 data = response.data.resource.categories;
			 $scope.categories = data;
			 $scope.sidebarData = data;
		 }, function (error) {
			console.log(error);
		});

		$scope.updatePost = function(inputs) {
			inputs.image = $scope.myFile;
			var data = new FormData();
			data.append('token', localStorage.getItem('token'));
			data.append('title', inputs.title);
			data.append('body', inputs.body);
			data.append('category_id', inputs.category_id);
			data.append('image', inputs.image);
			data.append('_method','PUT');

			var config = {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
			};
			$http.post('/api/posts/'+$routeParams.id, data, config)
				.then(function (response) {
		 			$location.path('/me/posts')

		 	 	}, function (error) {
			 		console.log(error);
			 	});
		}
}).controller('userSinglePostController', function($scope, $http, $routeParams, $location){
		var id = $routeParams.id;
		$http.get('/api/posts/'+id)
		 .then(function (response) {
			 var data = response.data.resource.post;
			 $scope.post = data;
		 }, function (error) {
			console.log(error);
		 })

		 $scope.deletePost= function(id) {
	 		var token = {
	 			params: {
	 				token:localStorage.getItem('token')
	 			}
	 		}
	 		console.log("delete post");
	 		$http.delete('/api/posts/'+id, token)
	 		 .then(function (response) {
	 			 console.log(response);
	 			 $location.path('/me/posts')
	 		 }, function (error) {
	 			console.log(error);
	 		});
	 	}
})
