<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use JWTAuth;

class PostRequest extends FormRequest
{

  public function all()
  {
     $inputs = parent::all();
     $user = JWTAuth::toUser($inputs['token']);
     unset($inputs['token']);
     $inputs['user_id'] = $user->id;
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
