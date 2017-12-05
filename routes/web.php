<?php

Route::get('register/verify/{confirmationCode}', [
    'as' =>'login_path',
    'uses'=>'Auth\RegisterController@confirm'
]);

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', function (){
   return redirect('/');	
});

//Categories routes
Route::get('/category', 'CategoriesController@index');
Route::get('/category/create', 'CategoriesController@create');
Route::post('/category/create', 'CategoriesController@store');
Route::delete('/category/{category}','CategoriesController@delete');
Route::get('/category/update/{category}', 'CategoriesController@update');
Route::post('/category/update/{category}', 'CategoriesController@storeNewData');

//Posts routes
Route::get('/posts/user','PostsController@userPosts');
Route::get('/posts/create','PostsController@create');
Route::post('/posts/create','PostsController@store');
Route::get('/posts','PostsController@index');
Route::get('/posts/{post}', 'PostsController@post');
Route::get('/post/update/{post}', 'PostsController@update');
Route::post('/post/update/{post}', 'PostsController@updateData');
Route::post('/post/delete/{id}', 'PostsController@deleteData');
Route::get('/posts/category/{category}', 'PostsController@category');

//social login
Route::post('ulogin', 'UloginController@login');