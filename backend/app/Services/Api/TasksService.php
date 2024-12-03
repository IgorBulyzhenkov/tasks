<?php

namespace App\Services\Api;

use App\Http\Requests\Api\TasksPostRequest;
use App\Http\Requests\Api\TasksPutRequest;
use App\Models\Api\Tasks;
use Illuminate\Support\Facades\Validator;

class TasksService
{
    public function getTasks($request): \Illuminate\Http\JsonResponse
    {
        $taskListExists = Tasks::where('id', $request->query('fk_task_list'))->exists();

        if (!$taskListExists) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid task list ID.',
            ], 400);
        }

        $page       = (int)$request->query('page', 1);
        $limit      = (int)$request->query('limit', 10);

        $query      = Tasks::query();

        $total      = $query->count();
        $totalPages = ceil($total / $limit);

        $data       = collect([]);

        $tasks      = $query
            ->skip(($page - 1) * $limit)
            ->where([
                'fk_task_list' => $request->query('fk_task_list'),
            ])
            ->take($limit)
            ->get();

        foreach ($tasks as $task){
            $newData = [
                'id'            => $task->id,
                'title'         => $task->title,
                'description'   => $task->description,
                'is_completed'  => $task->iscompleted,
                'created_at'    => $task->created_at->format('d/m/Y H:i'),
                'updated_at'    => $task->updated_at->format('d/m/Y H:i'),
                'tasks_list'    => $task->fkTaskList->name,
            ];

            $data[] = $newData;
        }

        return response()->json([
            'success'   => true,
            'data'      => [
                'data'              => $data,
                'current_page'      => $page,
                'limit'             => $limit,
                'total_records'     => $total,
                'total_pages'       => $totalPages,
            ],
        ], 200);
    }

    public function createTasks($tasks): \Illuminate\Http\JsonResponse
    {
        $request = new TasksPostRequest();

        $rules = $request->rules();

        $validator = Validator::make($tasks->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'message'   => $validator->errors()->getMessages()
            ], 400);
        }

        $tasksModel = new Tasks();

        $tasksModel->fill([
            'title'         => $tasks->title,
            'description'   => $tasks->description,
            'fk_task_list'  => $tasks->fk_task_list,
            'is_completed'  => $tasks->is_completed
        ]);

        $tasksModel->save();

        return response()->json([
            'success'   => true,
            'data'      => [
                'id'    =>  $tasksModel->id
            ]
        ], 201);
    }

    public function showTasks($id): \Illuminate\Http\JsonResponse
    {
        $tasks = Tasks::query()
            ->where([
                'id'        => $id
            ])->first();

        if(!$tasks){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        return response()->json([
            'success'   => true,
            'message'   => 'show task',
            'data'      => [
                'id'            => $tasks->id,
                'title'         => $tasks->title,
                'description'   => $tasks->description,
                'tasks_list'    => $tasks->fkTaskList->name,
                'created_at'    => $tasks->created_at->format('d/m/Y H:i'),
                'is_completed'  => $tasks->is_completed
            ]
        ], 200);
    }

    public function updatedTasks($tasks, $id): \Illuminate\Http\JsonResponse
    {
        $tasksModel = Tasks::query()->where([
            'id'        => $id
        ])->first();

        if(!$tasksModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $request    = new TasksPutRequest();

        $rules      = $request->rules();

        $validator  = Validator::make($tasks->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'message'   => $validator->errors()->getMessages()
            ], 400);
        }

        $tasksModel->fill([
            'title'         => $tasks->title,
            'description'   => $tasks->description,
            'is_completed'  => $tasks->is_completed
        ]);

        $tasksModel->update();

        return response()->json([
            'success'   => true,
            'message'   => 'update task',
            'data'      => $id
        ], 200);
    }

    public function destroyTasks($id): \Illuminate\Http\JsonResponse
    {
        $tasksModel = Tasks::query()->where([
            'id'        => $id
        ])->first();

        if(!$tasksModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $tasksModel->delete();

        return response()->json([
            'success'   => true,
            'message'   => 'Deleted task',
        ], 204);
    }
}
