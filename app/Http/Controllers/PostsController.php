<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Services\CategoryService;
use App\Services\PostService;

class PostsController extends Controller
{
    //
    protected $postService;
    public function __construct(PostService $postService)
    {
      $this->middleware('auth')
           ->except(['index','post', 'category']);
      $this->postService = $postService;
    }

    public function index()
    {
        $posts = $this->postService->all()->paginate(5);
        return view('posts.index', compact('posts'));
    }

    public function getAuthUserPosts()
    {
        $id = auth()->id();
        $posts = $this->postService->getByAuthorId($id)->paginate(5);
        return view('posts.myPosts',compact('posts'));
    }

    public function create(CategoryService $categoryService)
    {
        $categories = $categoryService->all();
        return view('posts.create', compact('categories'));
    }

    public function store(PostRequest $request)
    {
        $inputs = $request->all();
        $this->postService->create($inputs);
        return redirect('/me/posts');
    }

    public function show($id)
    {
        $post = $this->postService->getById($id);
        return view('posts.post', compact('post'));
    }

    public function edit($id, CategoryService $categoryService)
    {
        $categories = $categoryService->all();
        $post = $this->postService->getById($id);
        return view('posts.update',compact(['post','categories']));
    }

    public function update(PostRequest $request, $id)
    {
        $inputs = $request->all();
        $this->postService->update($inputs, $id);
        return redirect("/posts/$id");
    }

    public function delete($id)
    {
        $this->postService->delete($id);
        return redirect('/posts');
    }

    public function showByCategoryId($id, CategoryService $categoryService)
    {
        $posts = $this->postService->getByCategoryId($id)->paginate(5);
        $category = $categoryService->getById($id);
        return view('posts.category',compact(['posts','category']));
    }
}
