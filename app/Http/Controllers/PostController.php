<?php

namespace App\Http\Controllers;

use App\Category;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class PostController extends Controller
{
    //

    public function __construct()
    {
    $this->middleware('auth')
        ->except(['index','post']);
    }

    public function index(Post $post){
        $posts = $post->orderBy('created_at','desc')
            ->paginate(5);
        return view('posts.index', compact('posts'));
    }

    public function myPosts(Post $post){

        $posts = $post->orderBy('created_at','desc')
            ->where('user_id',auth()->id())
            ->paginate(5);

        return view('posts.myPosts',compact('posts'));
    }

    public function create(){
        $categories1 = Category::categories();

        return view('posts.create', compact('categories1'));
    }

    public function store(Request $request, Post $post){

        $this->validate($request, [
           'title'=>'required',
            'body'=>'required',
            'category_id'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);

        $inputs = $request->all();
        unset($inputs['_token']);
        $inputs['user_id'] = auth()->id();

        $image = Input::file('image');

        $inputs['img_url'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('\img');

        $image->move($destinationPath, $inputs['img_url']);

        $post->create($inputs);
        return redirect('/posts/my');
    }

    public function post(Post $post){
        return view('posts.post', compact('post'));
    }

    public function update(){
        $categories1 = Category::categories();
        return view('posts.update',compact(['post','categories1']));
    }

    public function updateData(Post $post){
        $this->validate(\request(), [
            'title'=>'required',
            'body'=>'required',
            'category_id'=>'required'
        ]);
        $inputs = \request()->all();
        unset($inputs['_token']);
        $inputs['user_id'] = auth()->id();
        $post->update($inputs);

        return redirect("/posts/$post->id");

    }

    public function deleteData($id, Post $post){
        $post->destroy($id);
        return redirect('/posts');
    }

    public function category(Category $category, Post $post){
        $posts = $post->orderBy('created_at','desc')
            ->where('category_id',$category->id)
            ->paginate(5);

        return view('posts.category',compact(['posts','category']));
    }
}
