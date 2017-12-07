<?php

namespace App\Services;

use App\Category;

class CategoryService
{

  protected $categories;

  function __construct(Category $categories)
  {
    # code...
    $this->categories = $categories;
  }

  public function create($inputs)
  {
    $this->categories->create($inputs);
  }

  public function update($inputs, $id)
  {
    $this->categories->where('id', $id)->update($inputs);
  }

  public function delete($id)
  {
    $this->categories->where('id', $id)->delete();
  }

  public function getById($id)
  {
    return $this->categories
                ->where('id', $id)
                ->get()
                ->first();
  }

  public function getByAuthorId($id)
  {
    return $this->categories
                ->where('user_id',$id)
                ->get();
  }
}
