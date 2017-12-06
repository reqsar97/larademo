<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use PhpParser\Error;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function login(Request $request)
    {

        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required'
        ]);


        $confirmed = User::where('confirmed', '=', '0')->
                        where('email','=',$request->email)->first();

        if ($confirmed != null && $confirmed->confirmed==0){
            $message = "You are not confirmed you Email!";
            return view('auth.login', compact('message'));
        }

        if (!auth()->attempt(request(['email','password']))){
            return $this->sendFailedLoginResponse($request);

        }

        return redirect()->home();
    }

}
