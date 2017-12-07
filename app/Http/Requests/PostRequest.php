<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
  public function all()
  {
     $inputs = parent::all();
     unset($inputs['_token']);
     unset($inputs['_method']);
     $inputs['user_id'] = auth()->id();
     return $inputs;
  }

  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
      return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
      return [
          'title'=>'required',
          'body'=>'required',
          'category_id'=>'required',
          'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      ];
  }
}
