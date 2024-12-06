<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\AuthService;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }

    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->authService->auth($request);
    }

    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        if ($request->bearerToken()) {
            $token = PersonalAccessToken::findToken($request->bearerToken());

            if($token){
                $token->delete();
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Logout successfully'
        ], 200);
    }

    public function user(Request $request): \Illuminate\Http\JsonResponse
    {
        if(auth()->id()){
            $user = auth()->user();

            return response()->json([
                'success'   => true,
                'message'   => 'User find',
                'data'      => [
                    'name'      => $user->name,
                    'email'     => $user->email,
                    'nickName'  => $user->nickName,
                    'token'     => $request->bearerToken(),
                    'verify'    => $user->email_verified_at ?? false
                ]
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ],401);
        }
    }
}
