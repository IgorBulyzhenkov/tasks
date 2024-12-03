<?php

namespace App\Services\Api;
use App\Http\Requests\Api\LoginPostRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthService
{
    public function auth($userRequest): \Illuminate\Http\JsonResponse
    {

        $request    = new LoginPostRequest();

        $rules      = $request->rules();

        $validator  = Validator::make($userRequest->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'errors'    => $validator
                    ->errors()
                    ->getMessages()
            ], 400);
        }

        $user = User::query()
            ->where('email', $userRequest->email)
            ->first();

        // Проверить существование пользователя и правильность пароля
        if (!$user || !Hash::check($userRequest->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password incorrect!',
            ], 400);
        }

        return response()->json([
            'success'   => true,
            'message'   => 'Login successful',
            'data'      => [
                'name'      => $user->name,
                'email'     => $user->email,
                'nickName'  => $user->nickName,
                'token'     => $user->createToken($user->email)->plainTextToken,
                'verify'    => $user->email_verified_at ?? false
            ]
        ], 200);
    }
}
