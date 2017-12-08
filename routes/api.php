<?php

Route::post('register', 'Api\UsersController@register');
Route::post('login', 'Api\UsersController@login');

Route::group(['middleware' => 'jwt.auth'], function ()
{

    //categories routes
    Route::get('/me/categories', 'Api\CategoriesController@getAuthUserCategories');
    Route::post('/categories', 'Api\CategoriesController@store');
    Route::put('/categories/{id}', 'Api\CategoriesController@update');
    Route::delete('/categories/{id}','Api\CategoriesController@delete');

    Route::post('logout', 'Api\UsersController@logout');

    //posts routes
    Route::get('/me/posts','Api\PostsController@getAuthUserPosts');
    Route::post('/posts','Api\PostsController@store');
    Route::delete('/posts/{id}', 'Api\PostsController@delete');
    Route::put('/posts/{id}', 'Api\PostsController@update');

});

Route::get('/categories', 'Api\CategoriesController@index');

Route::get('/posts','Api\PostsController@index');
Route::get('/posts/{id}', 'Api\PostsController@show');
Route::get('/posts/categories/{id}', 'Api\PostsController@postsByCategoryId');
