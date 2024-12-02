<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\RegistryService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected RegistryService $registryService;

    public function __construct(RegistryService $registryService){
        $this->registryService = $registryService;
    }

    public function signup(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->registryService->registerUser($request);
    }
}
