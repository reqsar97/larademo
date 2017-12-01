<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\User;
use App\Post;
use JWTAuth;
use JWTAuthException;
use Validator;

class CategoriesController extends Controller
{
    public function getAllCategories(){
    	$categories = Category::categories();
		$postCount = Post::all()->count();
		$userCount = User::all()->count();
    	return response()->json(compact(['categories','postCount', 'userCount']), 200);
    }

    public function index(Request $request){
    	$user = JWTAuth::toUser($request->token);
        $categories = Category::getUserCategories($user->id);
        return response()->json(compact('categories'), 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->only('name'), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 422);
        }
        $user = JWTAuth::toUser($request->token);
        $user->createCategory(
            new Category(request(['name']))
        );

        return response()->json(['message'=>'Category created successfully']);

    }

    public function delete(Category $category){
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function storeNewData(Category $category){
        $category->name = request('name');
        $category->save();

        return redirect('/category');
    }

}
