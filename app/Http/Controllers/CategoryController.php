<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){

        $categories = Category::getUserCategories(auth()->user()->id);
        return view('categories.categories', compact('categories'));
    }

    public function create(){
        return view('categories.create');
    }

    public function store(Request $request){

        $this->validate($request,[
            'name'=>'required'
        ]);
        auth()->user()->createCategory(
            new Category(request(['name']))
        );

        return redirect('/category');

    }

    public function delete(Category $category){
        $category->delete();

        return redirect()->back();
    }

    public function update(Category $category){
        return view('categories.update',compact('category'));
    }

    public function storeNewData(Category $category){
        $category->name = \request('name');
        $category->save();

        return redirect('/category');
    }
}
