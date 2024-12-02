<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\VerifyTokenService;
use Illuminate\Http\Request;

class VerifyController extends Controller
{
    protected VerifyTokenService $verifyTokenService;

    public function __construct(VerifyTokenService $verifyTokenService)
    {
        $this->verifyTokenService = $verifyTokenService;
    }

    public function verify(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->verifyTokenService->verify($request);
    }
}
