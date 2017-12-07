<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{

    protected $fillable = ['name','user_id'];

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
