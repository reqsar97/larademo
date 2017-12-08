<?php

namespace App\Services;

use App\Post;
use Illuminate\Support\Facades\Input;

class PostService
{

  protected $posts;

  function __construct(Post $posts)
  {
    # code...
    $this->posts = $posts;
  }

  public function all()
  {
    return $this->posts
                ->orderBy('created_at','desc')
                ->with('category')
                ->with('user');
  }

  public function create($inputs)
  {
    $image = Input::file('image');
    $inputs['img_url'] = time().'.'.$image->getClientOriginalExtension();
    $destinationPath = public_path('img');
    $image->move($destinationPath, $inputs['img_url']);
    $this->posts->create($inputs);
  }

  public function update($inputs, $id)
  {
    $image = Input::file('image');
    $inputs['img_url'] = time().'.'.$image->getClientOriginalExtension();
    $destinationPath = public_path('img');
    $image->move($destinationPath, $inputs['img_url']);
    unset($inputs['image']);
    $this->posts->where('id', $id)->update($inputs);
  }

  public function delete($id)
  {
    $this->posts->where('id', $id)->delete();
  }

  public function getById($id)
  {
    return $this->posts
                ->where('id', $id)
                ->with('category')
                ->with('user')
                ->first();
  }

  public function getByAuthorId($id)
  {
    return $this->posts
                ->orderBy('created_at','desc')
                ->where('user_id',$id)
                ->with('category')
            	  ->with('user');
  }

  public function getByCategoryId($id)
  {
    return $this->posts
                ->orderBy('created_at','desc')
                ->where('category_id',$id)
                ->with('user')
                ->with('category');
  }
}
