<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\User;
use Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
     public function __construct() 
    {
        $this->middleware('auth:api')->except('login', 'register');
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/',
        ]);

        if($validator->fails()){
             return response()->json($validator->errors(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        $token = JWTAuth::fromUser($user);
       
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request) 
    {
        $credentials = $request->only(["email","password"]);
        if(!$token = auth('api')->attempt($credentials)) {
            return response()->json(["error" => "Unauthorized"], 401);
        }
        return $this->respondWithToken($token);
    }

     public function user(Request $request) 
    {
        return response()->json(auth('api')->user());
    }

     public function logout(Request $request) 
    {
        auth('api')->logout();
        return response()->json(["message" => "Successfully logged out"]);
    }

     public function refresh(Request $request) 
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

      protected function respondWithToken($token) 
    {
        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer",
            "expires_in" => \Config::get('jwt.ttl') * 60
        ]);
    }
}
