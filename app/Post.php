<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'body','img_url', 'user_id','category_id'];

    //
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function categoryName($category_id){
        return Category::all()->where('id',$category_id)->first()->name;
    }

}
