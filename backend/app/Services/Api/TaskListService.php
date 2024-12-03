<?php

namespace App\Services\Api;

use App\Http\Requests\Api\TaskListPostRequest;
use App\Models\Api\TaskList;
use Illuminate\Support\Facades\Validator;

class TaskListService
{
    public function getTasksList($request): \Illuminate\Http\JsonResponse
    {
        $page       = (int)$request->query('page', 1);
        $limit      = (int)$request->query('limit', 10);

        $query      = TaskList::query();

        $total      = $query->count();
        $totalPages = ceil($total / $limit);

        $data       = collect([]);

        $task_list  = $query
            ->skip(($page - 1) * $limit)
            ->where([
                'fk_user'   => auth()->id()
            ])
            ->take($limit)
            ->get();

        foreach ($task_list as $task){
            $newData = [
                'id'            => $task->id,
                'name'          => $task->name,
                'description'   => $task->description,
                'is_completed'  => $task->iscompleted,
                'created_at'    => $task->created_at->format('d/m/Y H:i'),
                'updated_at'    => $task->updated_at->format('d/m/Y H:i'),
                'user'          => $task->fkUser->name
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

    public function createTaskList($taskList): \Illuminate\Http\JsonResponse
    {
        $request = new TaskListPostRequest();

        $rules = $request->rules();

        $validator = Validator::make($taskList->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'message'   => $validator->errors()->getMessages()
            ], 400);
        }

        $taskListModel = new TaskList();

        $user = auth()->user();

        $taskListModel->fill([
            'name'          => $taskList->name,
            'description'   => $taskList->description,
            'fk_user'       => $user->id,
            'is_completed'  => $taskList->is_completed
        ]);

        $taskListModel->save();

        return response()->json([
            'success'   => true,
            'data'      => [
                'id'    =>  $taskListModel->id
            ]
        ], 201);
    }

    public function showTaskList($id): \Illuminate\Http\JsonResponse
    {
        $task_list = TaskList::query()
            ->where([
                'id'        =>  $id,
                'fk_user'   => auth()->id()
            ])->first();

        if(!$task_list){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        return response()->json([
            'success'   => true,
            'message'   => 'show task',
            'data'      => [
                'id'            => $task_list->id,
                'name'          => $task_list->name,
                'description'   => $task_list->description,
                'user'          => $task_list->fkUser->name,
                'created_at'    => $task_list->created_at->format('d/m/Y H:i'),
                'is_completed'  => $task_list->is_completed
            ]
        ], 200);
    }

    public function updatedTaskList($taskList, $id): \Illuminate\Http\JsonResponse
    {
        $taskListModel = TaskList::query()->where([
            'id'        => $id,
            'fk_user'   => auth()->id()
        ])->first();

        if(!$taskListModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $request = new TaskListPostRequest();

        $rules = $request->rules();

        $validator = Validator::make($taskList->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'success'   => false,
                'message'   => $validator->errors()->getMessages()
            ], 400);
        }

        $taskListModel->fill([
            'name'          => $taskList->name,
            'description'   => $taskList->description,
            'is_completed'  => $taskList->is_completed
        ]);

        $taskListModel->update();

        return response()->json([
            'success'   => true,
            'message'   => 'update task',
            'data'      => $id
        ], 200);
    }

    public function destroyTaskList($id): \Illuminate\Http\JsonResponse
    {
        $taskListModel = TaskList::query()->where([
            'id'        => $id,
            'fk_user'   => auth()->id()
        ])->first();

        if(!$taskListModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $taskListModel->delete();

        return response()->json([
            'success'   => true,
            'message'   => 'Deleted task',
        ], 204);
    }
}
