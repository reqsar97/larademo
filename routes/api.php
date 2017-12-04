<?php

Route::post('register', 'Api\UserController@register');
Route::post('login', 'Api\UserController@login');
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user', 'Api\UserController@getAuthUser');
    Route::post('logout', 'Api\UserController@logout');
    Route::post('/userCategories/create', 'Api\CategoriesController@store');
    Route::get('/userCategories', 'Api\CategoriesController@index');
    Route::post('/category/{category}','Api\CategoriesController@delete');
    Route::post('/category/update/{category}', 'Api\CategoriesController@storeNewData');
    Route::get('/posts/userPosts','Api\PostsController@userPosts');
    Route::post('/posts/create','Api\PostsController@store');
    Route::post('/post/delete/{id}', 'Api\PostsController@deleteData');
    Route::post('/post/update/{post}', 'Api\PostsController@updateData');
});

Route::get('allCategories', 'Api\CategoriesController@getAllCategories');

Route::get('/posts','Api\PostsController@index');
Route::get('/posts/{post}', 'Api\PostsController@post');
Route::get('/posts/category/{category}', 'Api\PostsController@category');
