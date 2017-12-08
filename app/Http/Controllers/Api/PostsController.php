<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use App\Http\Requests\Api\PostRequest;
use App\Services\PostService;

class PostsController extends Controller
{

    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }


    public function index()
    {
        $posts = $this->postService
                      ->all()
                      ->paginate(5);
        return response()->json(
          ['status' => 'success',
           'message' => 'get all posts',
           'resource' => compact('posts')], 200);
    }

    public function show($id)
    {
        $post = $this->postService->getById($id);
        return response()->json(
          ['status' => 'success',
           'message' => 'get single post',
           'resource' =>compact('post')],200);
    }

    public function getAuthUserPosts(Request $request)
    {
        $token = $request->token;
        $user = JWTAuth::toUser($token);
        $posts = $this->postService
                      ->getByAuthorId($user->id)
                      ->paginate(5);
        return response()->json(
          ['status' => 'success',
           'message' => 'show user posts',
           'resource' => compact('posts')], 200);
    }

    public function store(PostRequest $request)
    {
        $inputs = $request->all();
        $this->postService->create($inputs);
        return response()->json(
          ['status' => 'success',
           'message' => 'Post created successfully',
           'resource' => null], 200);
    }

    public function postsByCategoryId($id)
    {
        $posts = $this->postService
                      ->getByCategoryId($id)
                      ->paginate(5);
        return response()->json(
          ['status' => 'success',
           'message' => 'show posts by category',
           'resource' => compact('posts')], 200);
    }

    public function delete($id){
        $this->postService->delete($id);
        return response()->json(
          ['success' => 'true',
           'message' => 'Post deleted successfully'
           'resource' => null], 200);
    }

    public function update(PostRequest $request,$id)
    {
        $inputs = $request->all();
        $this->postService->update($inputs, $id);
        return response()->json(
          ['status' => 'success',
           'message' => 'Post updated successfully',
           'resource' => null], 200);
    }

}
