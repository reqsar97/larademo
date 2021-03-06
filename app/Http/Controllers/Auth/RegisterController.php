<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    public function register(RegisterRequest $request)
    {
        $confirmation_code = str_random(30);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'confirmation_code'=>$confirmation_code
        ]);
        Mail::send(
            'email.verify',
            compact('confirmation_code'),
            function($message) {
            $message->to(Input::get('email'), Input::get('username'))
                ->subject('Verify your email address');
        });
        return redirect()->home();
    }

    public function confirm($confirmation_code)
    {
        if ( ! $confirmation_code)
        {
            return redirect()->home();
        }
        $user = User::where('confirmation_code','=', $confirmation_code)
            ->first();
        if ( !$user )
        {
            return redirect()->home();
        }
        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();
        return redirect('login');
    }

}
