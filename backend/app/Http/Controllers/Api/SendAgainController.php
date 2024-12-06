<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\SendAgainService;
use Illuminate\Http\Request;

class SendAgainController extends Controller
{
    protected SendAgainService $sendAgainService;

    public function __construct(SendAgainService $sendAgainService){
        $this->sendAgainService = $sendAgainService;
    }

    public function sendAgain(Request $request){
        return $this->sendAgainService->sandAgainEmail($request);
    }
}
