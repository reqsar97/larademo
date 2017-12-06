<?php

namespace App\Http\Controllers;

use App\Category;
use App\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Input;

class PostsController extends Controller
{
    //

    public function __construct()
    {
    $this->middleware('auth')
        ->except(['index','post', 'category']);
    }

    public function index(Post $post)
    {
        $posts = $post->orderBy('created_at','desc')
            ->paginate(5);

        return view('posts.index', compact('posts'));
    }

    public function userPosts(Post $post)
    {

        $posts = $post->orderBy('created_at','desc')
            ->where('user_id',auth()->id())
            ->paginate(5);

        return view('posts.myPosts',compact('posts'));
    }

    public function create()
    {
        $categories1 = Category::categories();

        return view('posts.create', compact('categories1'));
    }

    public function store(StorePostRequest $request, Post $post)
    {

        $inputs = $request->all();
        
        $image = Input::file('image');

        $inputs['img_url'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('img');

        $image->move($destinationPath, $inputs['img_url']);
        
        $post->create($inputs);

        return redirect('/posts/user');
    }

    public function show(Post $post)
    {
        return view('posts.post', compact('post'));
    }

    public function edit(Post $post)
    {
        $categories1 = Category::categories();
        return view('posts.update',compact(['post','categories1']));
    }

    public function update(UpdatePostRequest $request, $id){

        $inputs = $request->all();
        
        $post = Post::where('id',$id)->first();
        $post->update($inputs);

        return redirect("/posts/$post->id");

    }

    public function delete($id, Post $post)
    {
        $post->destroy($id);
        return redirect('/posts');
    }

    public function category(Category $category, Post $post)
    {
        $posts = $post->orderBy('created_at','desc')
            ->where('category_id',$category->id)
            ->paginate(5);

        return view('posts.category',compact(['posts','category']));
    }
}
