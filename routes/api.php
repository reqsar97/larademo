<?php

Route::post('register', 'Api\UserController@register');
Route::post('login', 'Api\UserController@login');
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user', 'Api\UserController@getAuthUser');
    Route::post('logout', 'Api\UserController@logout');
});

Route::get('allCategories', 'Api\CategoriesController@getAllCategories');