<?php

namespace App\Http\Middleware\Api;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class VerifyTokenUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!is_null($request->token)){
            $user = PersonalAccessToken::findToken($request->token);

            if(is_null($user)){
                abort(404);
            }
            $user = $user->tokenable;

            Auth::login($user, true);

            $user->tokens()->delete();

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Token Verified',
            ],200);
        }

        if(count($request->all()) === 0 ) {

            If(Auth::user() && Auth::user()->is_active === false){

                Auth::logout();
                return response()->json([
                    'status' => Response::HTTP_FORBIDDEN,
                    'message' => 'Token Expired'
                ], 400);

            }

            return $next($request);
        }

        return $next($request);
    }
}
