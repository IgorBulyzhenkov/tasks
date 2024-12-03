<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\TasksService;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    protected TasksService $tasksService;

    public function __construct(TasksService $tasksService)
    {
        $this->tasksService = $tasksService;
    }

    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->tasksService->getTasks($request);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        return $this->tasksService->createTasks($request);
    }

    public function show($id): \Illuminate\Http\JsonResponse
    {
        return $this->tasksService->showTasks($id);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        return $this->tasksService->updatedTasks($request, $id);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        return $this->tasksService->destroyTasks($id);
    }
}
