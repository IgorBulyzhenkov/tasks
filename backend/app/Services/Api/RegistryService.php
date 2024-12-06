<?php

namespace App\Services\Api;

use App\Http\Requests\Api\AuthUserPostRequest;
use App\Mail\Api\ConfirmMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RegistryService
{
    public function registerUser($user): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();

            $request = new AuthUserPostRequest();

            $rules = $request->rules();

            $validator = Validator::make($user->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->getMessages()
                ], 400);
            }

            $userModel = new User();

            $userModel->fill([
                'name'                  => $user->name,
                'email'                 => $user->email,
                'nickName'              => $user->nickName,
                'password'              => $user->password,
                'verification_token'    => hash('sha256', $user->email),
            ]);

            if ($userModel->save()) {

                Mail::to($userModel->fresh()->email)
                    ->send(new ConfirmMail($userModel->fresh()));

                DB::commit();

                return response()->json([
                    'success'   => true,
                    'message'   => 'Signup successfully',
                    'data'      => [
                        'name'                  => $user->name,
                        'email'                 => $user->email,
                        'nickName'              => $user->nickName,
                        'verificationToken'     => hash('sha256', $user->email),
                    ]
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ], 400);

        }catch (\Exception $exception){
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ],400);
        }
    }
}
