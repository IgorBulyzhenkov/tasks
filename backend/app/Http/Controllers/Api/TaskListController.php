<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\TaskList;
use App\Services\Api\TaskListService;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    protected TaskListService $taskListService;

    public function __construct(TaskListService $taskListService)
    {
        $this->taskListService = $taskListService;
    }

    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->taskListService->getTasksList($request);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->taskListService->createTaskList($request);
    }

    public function show($id): \Illuminate\Http\JsonResponse
    {
        return $this->taskListService->showTaskList($id);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        return $this->taskListService->updatedTaskList($request, $id);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        return $this->taskListService->destroyTaskList($id);
    }
}
