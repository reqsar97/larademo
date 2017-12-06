<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use App\User;
use JWTAuthException;
use Validator;
use App\Http\Requests\Api\RegisterRequest;

class UsersController extends Controller
{   
    private $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
   
    //Registration with JWT token
    public function register(RegisterRequest $request)
    {

        $inputs = $request->all();

        $confirmation_code = str_random(30);

        $user = User::create([
            'name' => $inputs['name'],
            'email' => $inputs['email'],
            'password' => bcrypt($inputs['password']),
            'confirmation_code'=>$confirmation_code
        ]);

        return response()->json(['status'=>true,'message'=>'User created successfully','data'=>$user], 200);
    }
    
    //Login with JWT token
    public function login(Request $request)
    {
        $inputs = $request->only('email', 'password');
        $token = null;


        $validator = Validator::make($inputs, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        try {
           if (!$token = JWTAuth::attempt($inputs)) {
            return response()->json(['invalid_email_or_password'], 422);
           }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        $user = JWTAuth::toUser($token);
        $name = $user->name;
        return response()->json(compact(['token','name']), 200);
    }
    public function getAuthUser(Request $request)
    {
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }

    public function logout(Request $request) 
    {

        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }
}  