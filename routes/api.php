<?php

Route::post('register', 'Api\UsersController@register');
Route::post('login', 'Api\UsersController@login');

Route::group(['middleware' => 'jwt.auth'], function () 
{

    //categories routes
    Route::get('/me/categories', 'Api\CategoriesController@getAuthUserCategories');
    Route::post('/categories', 'Api\CategoriesController@store');
    Route::post('/categories/{category}/edit', 'Api\CategoriesController@storeNewData');
    Route::delete('/categories/{category}','Api\CategoriesController@delete');

    Route::post('logout', 'Api\UsersController@logout');
    
    //posts routes
    Route::get('/me/posts','Api\PostsController@userPosts');
    Route::post('/posts','Api\PostsController@store');
    Route::delete('/posts/{id}', 'Api\PostsController@delete');
    Route::put('/posts/{post}', 'Api\PostsController@update');

});

Route::get('/categories', 'Api\CategoriesController@getAllCategories');

Route::get('/posts','Api\PostsController@index');
Route::get('/posts/{post}', 'Api\PostsController@post');
Route::get('/posts/categories/{category}', 'Api\PostsController@category');
