<?php

namespace App\Services\Api;

use App\Mail\Api\ConfirmMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SendAgainService
{
    public function sandAgainEmail($data){

        $validator = Validator::make($data->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'message'   => $validator->errors()
            ],400);
        }

        $user = User::query()
            ->where('email', $data->email)
            ->first();

        if($user->id && !is_null($user->verification_token)){
            $user->fill([
                'verification_token' => hash('sha256', $data->email)
            ]);

            if($user->update()){
                Mail::to($user->fresh()->email)
                    ->send(new ConfirmMail($user));

                return response()->json([
                    'success'               => true,
                    'message'               => 'Email send successfully',
                    'verificationToken'     => $user->verification_token
                ], 200);
            }
        }

        return response()->json([
            'success'   => false,
            'message'   => 'Email not found'
        ], 400);
    }
}
