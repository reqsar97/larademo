<?php



//Route::get('/register', 'RegistrationController@show');
//Route::post('/register', 'RegistrationController@create');
Route::get('register/verify/{confirmationCode}', [
    'as' =>'login_path',
    'uses'=>'Auth\RegisterController@confirm'
]);

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
//Route::get('/', function (){
//    return phpversion();
//})->name('home');

//Categories routes
Route::get('/category', 'CategoryController@index');
Route::get('/category/create', 'CategoryController@create');
Route::post('/category/create', 'CategoryController@store');
Route::delete('/category/{category}','CategoryController@delete');
Route::get('/category/update/{category}', 'CategoryController@update');
Route::post('/category/update/{category}', 'CategoryController@storeNewData');

//Posts routes
Route::get('/posts/my','PostController@myPosts');
Route::get('/posts/create','PostController@create');
Route::post('/posts/create','PostController@store');
Route::get('/posts','PostController@index');
Route::get('/posts/{post}', 'PostController@post');
Route::get('/post/update/{post}', 'PostController@update');
Route::post('/post/update/{post}', 'PostController@updateData');
Route::post('/post/delete/{id}', 'PostController@deleteData');
Route::get('/posts/category/{category}', 'PostController@category');

//social login
Route::post('ulogin', 'UloginController@login');