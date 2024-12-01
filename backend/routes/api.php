<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\SendAgainController;
use App\Http\Controllers\Api\VerifyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/v1')->group(function () {

    Route::prefix('/auth')->group(function () {
        Route::post('/signup',          [RegisterController::class, 'signup']);
        Route::post('/login',           [AuthController::class, 'login']);

        Route::post('/verify-email',    [VerifyController::class, 'verify']);
        Route::post('/send-again',      [SendAgainController::class, 'sendAgain']);
    });

    Route::get('/logout',               [AuthController::class, 'logout']);
});
