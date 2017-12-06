<?php



Route::get('register/verify/{confirmationCode}', [
    'as' =>'login_path',
    'uses'=>'Auth\RegisterController@confirm'
]);

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', function ()
{
   return redirect('/');	
});

//Categories routes
Route::get('/me/categories', 'CategoriesController@index');
Route::get('/me/categories/create', 'CategoriesController@create');
Route::post('/categories', 'CategoriesController@store');
Route::delete('/categories/{category}','CategoriesController@delete');
Route::get('/me/categories/{category}/edit', 'CategoriesController@edit');
Route::put('/me/categories/{category}', 'CategoriesController@update');

//Posts routes
Route::get('/posts','PostsController@index');
Route::get('/me/posts','PostsController@userPosts');
Route::get('/me/posts/create','PostsController@create');
Route::post('/posts','PostsController@store');
Route::get('/posts/{post}', 'PostsController@show');
Route::get('/posts/{post}/edit', 'PostsController@edit');
Route::put('/posts/{id}', 'PostsController@update');
Route::delete('/posts/{id}', 'PostsController@delete');
Route::get('/posts/category/{category}', 'PostsController@category');


//social login
Route::post('ulogin', 'UloginController@login');