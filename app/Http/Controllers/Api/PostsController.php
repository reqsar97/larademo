<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use App\Category;
use Validator;
use Illuminate\Support\Facades\Input;
use JWTAuth;
use JWTAuthException;
use App\Http\Requests\Api\StorePostRequest;
use App\Http\Requests\Api\UpdatePostRequest;

class PostsController extends Controller
{
    //
    public function index(Post $post)
    {
        $posts = $post->orderBy('created_at','desc')
        	->with('category')
        	->with('user')
            ->paginate(5);
        // return view('posts.index', compact('posts'));

        return response()->json(compact('posts'), 200);
    }

    public function post(Post $post)
    {

    	$post = $post->with(['category','user'])->where('id',$post->id)->first();
        return response()->json(compact('post'),200);

    }

    public function userPosts(Post $post)
    {

        $token = request()->all()['token'];

        $user = JWTAuth::toUser($token);

        $posts = $post->orderBy('created_at','desc')
            ->where('user_id',$user->id)
            ->with('category')
        	->with('user')
            ->paginate(5);

        return response()->json(compact('posts'), 200);
    }

    public function store(StorePostRequest $request, Post $post)
    {
        
        $inputs = $request->all();

        $image = Input::file('image');

        $inputs['img_url'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('img');

        $image->move($destinationPath, $inputs['img_url']);

        $post->create($inputs);
        
        return response()->json(['status'=>true,'message'=>'Post created successfully'], 200);
    }

    public function category(Category $category, Post $post)
    {
        $posts = $post->orderBy('created_at','desc')
            ->where('category_id',$category->id)
            ->with('user')
            ->with('category')
            ->paginate(5);

        return response()->json(compact('posts'), 200);
    }

    public function delete($id, Post $post){
        $post->destroy($id);
        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function update(UpdatePostRequest $request,Post $post)
    {

        $inputs = $request->all();

        $post->update($inputs);

        return response()->json(['status'=>true,'message'=>'Post updated successfully'], 200);

    }

}
