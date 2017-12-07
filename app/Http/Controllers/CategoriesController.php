<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Http\Requests\CategoryRequest;

class CategoriesController extends Controller
{

    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->middleware('auth');
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $id = auth()->id();
        $categories = $this->categoryService->getByAuthorId($id);
        return view('categories.categories', compact('categories'));
    }

    public function create()
    {
        return view('categories.create');
    }

    public function store(CategoryRequest $request)
    {
        $inputs = $request->all();
        $this->categoryService->create($inputs);
        return redirect('/me/categories');
    }

    public function delete($id)
    {
        $this->categoryService->delete($id);
        return redirect()->back();
    }

    public function edit($id)
    {
        $category = $this->categoryService->getById($id);
        return view('categories.update',compact('category'));
    }

    public function update(CategoryRequest $request, $id)
    {
        $this->categoryService->update($request->all(), $id);
        return redirect('/me/categories');
    }
}
