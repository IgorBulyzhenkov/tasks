<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\TaskListUserService;
use Illuminate\Http\Request;

class TaskListUserController extends Controller
{
    protected TaskListUserService $taskListUserService;

    public function __construct(TaskListUserService $taskListUserService)
    {
        $this->taskListUserService = $taskListUserService;
    }

    public function searchUsers(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->taskListUserService->searchUser($request);
    }

    public function getListUsers(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->taskListUserService->getUsersToTaskList($request);
    }

    public function bindToTask(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->taskListUserService->bindToTask($request);
    }
}
