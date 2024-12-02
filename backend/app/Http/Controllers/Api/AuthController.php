<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){
        return response()->json([
            'success' => true,
            'message' => 'Login successfully',
            'data' => $request->all()
        ],200);
    }
}
