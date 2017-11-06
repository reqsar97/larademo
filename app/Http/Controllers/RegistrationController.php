<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    //
    public function create(){
        $this->validate(request(),[
            'name'=>'required',
            'email'=>'required|email',
            'password'=>'required|confirmed'
        ]);

        $user = User::create([
            'name'=>\request('name'),
            'email'=>\request('email'),
            'password'=>\request('password')
        ]);

        auth()->login($user);

        return redirect('/');

    }

    public function show(){
        return view('registration.create');
    }
}
