<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class ApiAuthenticate extends Middleware
{
    protected function unauthenticated($request, AuthenticationException|array $exception)
    {

            return response()->json([
                'message' => 'Unauthorized',
            ], 401);

    }
}
