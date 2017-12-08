<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\Api\CategoryRequest;
use App\Services\CategoryService;
use App\Services\PostService;
use App\Http\Controllers\Controller;
use JWTAuth;
use App\User;

class CategoriesController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    //return all categories 
    public function index(PostService $postService)
    {
    	$categories = $this->categoryService->all();
		  $postCount = $postService->all()->count();
		  $userCount = User::all()->count();
    	return response()->json(
        ['status' => 'success',
         'message' => 'Get all categories',
         'resource' => compact(['categories','postCount', 'userCount'])], 200);
    }

    public function getAuthUserCategories(Request $request)
    {
    	  $user = JWTAuth::toUser($request->token);
        $categories = $user->categories;
        return response()->json(
          ['status' => 'success',
           'message' => 'get all user categories',
           'resource' => compact('categories')], 200);
    }

    public function store(CategoryRequest $request)
    {
        $inputs = $request->all();
        $this->categoryService->create($inputs);
        return response()->json(
          ['status' => 'success',
           'message'=>'Category created successfully',
           'resource' => null], 200);
    }

    public function delete($id)
    {
        $this->categoryService->delete($id);
        return response()->json(
          ['status' => 'success',
           'message' => 'Category deleted successfully',
           'resource' => null], 200);
    }

    public function update(CategoryRequest $request, $id)
    {
        $inputs = $request->all();
        $this->categoryService->update($inputs, $id);
        return response()->json(
          ['status' => 'success',
           'message' => 'Category updated successfully',
           'resource' => null]);
    }

}
