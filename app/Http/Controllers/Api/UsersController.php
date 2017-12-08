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
use App\Http\Requests\Api\LoginRequest;

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
        return response()->json(
          ['status'=>'success',
          'message' => 'User created successfully',
          'resourse'=>$user], 200
        );
    }

    //Login with JWT token
    public function login(LoginRequest $request)
    {
        $inputs = $request->only('email', 'password');
        $token = null;
        try {
           if (!$token = JWTAuth::attempt($inputs)) {
            return response()->json(
              ['status' => 'error',
               'message' => 'invalid_email_or_password',
               'resourse' => null], 422
            );
           }
        } catch (JWTAuthException $e) {
            return response()->json(
              ['success' => 'error',
               'message' => 'failed_to_create_token',
               'resourse' => null], 500
            );
        }
        $user = JWTAuth::toUser($token);
        $name = $user->name;
        return response()->json(
          ['status' => 'success',
           'User logged successfully',
           'resourse' => compact(['token','name']) ], 200);
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(
              ['status' => 'success',
               'message' => 'User logout successfully',
               'resourse' => null], 200);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(
              ['status' => 'error',
               'message' => 'Failed to logout, please try again.',
               'resourse' => null], 500);
        }
    }
}
