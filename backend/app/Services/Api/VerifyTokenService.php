<?php

namespace app\Services\Api;

use App\Models\User;

class VerifyTokenService
{
    public function verify($request): \Illuminate\Http\JsonResponse
    {
        $user = $this->tokenVerification($request->verification_token);

        if (is_null($user)) {
            return response()->json([
                'success'   => false,
                'message'   => 'User not found',
            ], 400);
        }

        if (is_null($user->verification_token)) {
            return response()->json([
                'success'   => true,
                'message'   => 'Verify successfully',
                'data'      => $user
            ], 200);
        }

        $user->fill([
            'email_verified_at'     => now(),
            'verification_token'    => null
        ]);

        $user->update();

        return response()->json([
            'success'   => true,
            'message'   => 'Verify successfully',
            'data'      => [
                'name'                  => $user->name,
                'email'                 => $user->email,
                'nickName'              => $user->nickName,
                'token'                 => $user->createToken($user->email)->plainTextToken,
                'verify'                => true
            ]
        ], 200);
    }

    public function tokenVerification($token)
    {
        return User::where('verification_token',  $token)->first();
    }
}
