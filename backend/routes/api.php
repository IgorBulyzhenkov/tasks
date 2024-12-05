<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\SendAgainController;
use App\Http\Controllers\Api\TaskListController;
use App\Http\Controllers\Api\TaskListUserController;
use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\VerifyController;
use App\Http\Middleware\Api\ValidateToken;
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
        Route::post('/signup',              [RegisterController::class, 'signup']);
        Route::post('/login',               [AuthController::class, 'login']);

        Route::post('/verify-email',        [VerifyController::class, 'verify']);
        Route::post('/send-again',          [SendAgainController::class, 'sendAgain']);
    });

    Route::middleware('auth:sanctum')->group(function(){
        Route::get('/logout',               [AuthController::class, 'logout']);

        Route::prefix('/task-list')->group(function () {
            Route::get('/',                 [TaskListController::class, 'index']);
            Route::get('/{id}',             [TaskListController::class, 'show']);
            Route::post('/',                [TaskListController::class, 'store']);
            Route::put('/{id}',             [TaskListController::class, 'update']);
            Route::delete('/{id}',          [TaskListController::class, 'destroy']);
        });

        Route::prefix('/tasks')->group(function () {
            Route::get('/',                 [TasksController::class, 'index']);
            Route::get('/{id}',             [TasksController::class, 'show']);
            Route::post('/',                [TasksController::class, 'store']);
            Route::put('/{id}',             [TasksController::class, 'update']);
            Route::delete('/{id}',          [TasksController::class, 'destroy']);
        });

        Route::prefix('/users')->group(function () {
            Route::get('/',                 [TaskListUserController::class, 'getListUsers']);
            Route::get('/search',           [TaskListUserController::class, 'searchUsers']);
            Route::post('/bind',            [TaskListUserController::class, 'bindToTask']);
        });
    });
});
