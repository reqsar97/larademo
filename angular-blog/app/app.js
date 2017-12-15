// localStorage.setItem('isLogged', 0);
var app = angular.module('myApp', [
	'ngRoute',
	'app.controllers',

])

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl : 'view/auth/login.html',
        controller: 'LoginController'
    })
    .when('/register', {
        templateUrl : 'view/auth/register.html',
        controller: 'RegisterController'
    })
		.when('/posts/category/:id',{
			templateUrl : 'view/posts/postsByCategory.html',
			controller: 'postsByCategoryController'
		})
		.when('/posts', {
			templateUrl: 'view/posts/allPosts.html',
			controller: 'allPostsController'
		})
		.when('/posts/post/:id', {
			templateUrl: 'view/posts/singlePost.html',
			controller: 'singlePostController'
		})
		.when('/me/posts', {
			templateUrl: 'view/posts/userPosts.html',
			controller: 'userPostsController'
		})
		.when('/me/categories', {
			templateUrl: "view/categories/userCategories.html",
			controller: 'userCategoriesController'
		})
		.when('/me/categories/create',{
			templateUrl: "view/categories/createCategory.html",
			controller: 'createCategoryController'
		})
		.when('/me/categories/:id', {
			templateUrl: "view/categories/updateCategory.html",
			controller: 'updateCategoryController'
		})
		.when('/me/posts/create',{
			templateUrl: "view/posts/createPost.html",
			controller: 'createPostController'
		})
		.when('/posts/:id/edit',{
			templateUrl: "view/posts/updatePost.html",
			controller: 'updatePostController'
		})
		.when('/me/posts/post/:id',{
			templateUrl: "view/posts/userSinglePost.html",
			controller: 'userSinglePostController'
		})

});
