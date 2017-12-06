<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{

    protected $fillable = ['name','user_id'];

    public static function categories()
    {
        return DB::table('categories')->select(
            DB::raw('name,id'))
            ->get()
            ->toArray();
    }

    public static function getUserCategories($id)
    {
        return Category::where('user_id','=',$id)
            ->get()
            ->toArray();
    }

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
