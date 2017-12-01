<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\User;
use App\Post;

class CategoriesController extends Controller
{
    public function getAllCategories(){
    	$categories = Category::categories();
		$postCount = Post::all()->count();
		$userCount = User::all()->count();
    	return response()->json(compact(['categories','postCount', 'userCount']), 200);
    }
}
