<?php

namespace App\Services\Api;

use App\Http\Requests\Api\TaskListPostRequest;
use App\Models\Api\TaskList;
use App\Models\Api\TaskListUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskListService extends BaseApiService
{
    public function getTasksList($request): \Illuminate\Http\JsonResponse
    {
        $page       = (int)$request->query('page', 1);
        $limit      = (int)$request->query('limit', 10);

        $dataTaskListUser = TaskListUser::query()
            ->select('fk_task_list')
            ->where([
                'fk_user' => auth()->id(),
            ])
            ->pluck('fk_task_list');

        if($dataTaskListUser->count() === 0){
            return response()->json([
                'success'   => true,
                'data'      => [
                    'data'              => $dataTaskListUser,
                    'current_page'      => $page,
                    'limit'             => $limit,
                    'total_records'     => 0,
                    'total_pages'       => 0,
                ],
            ], 200);
        }

        $taskLists = TaskList::query()
            ->whereIn('id', $dataTaskListUser)
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        $data = $taskLists->map(function ($task) {

            $user = $task->user()->where('fk_user', auth()->id())->first();

            $userCreated = $task->user()->where([
                'fk_task_list'  => $task->id,
                'permission'    => 'full'
            ])->first();

            return [
                'id'            => $task->id,
                'name'          => $task->name,
                'description'   => $task->description,
                'is_completed'  => $task->is_completed,
                'created_at'    => $task->created_at->format('d/m/Y H:i'),
                'updated_at'    => $task->updated_at->format('d/m/Y H:i'),
                'user'          => $userCreated->name,
                'permission'    => $user->pivot->permission,
            ];
        });

        $totalRecords   = TaskList::query()
            ->whereIn('id', $dataTaskListUser)
            ->count();

        $totalPages     = $totalRecords > 0 ? ceil($totalRecords / $limit) : 1;

        return response()->json([
            'success' => true,
            'data'    => [
                'data'          => $data,
                'current_page'  => $page,
                'limit'         => $limit,
                'total_records' => $totalRecords,
                'total_pages'   => $totalPages,
            ],
        ], 200);

    }

    public function createTaskList($taskList): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();

            $request = new TaskListPostRequest();

            $rules = $request->rules();

            $validator = Validator::make($taskList->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->getMessages()
                ], 400);
            }

            $taskListModel = new TaskList();

            $taskListModel->fill([
                'name'          => $taskList->name,
                'description'   => $taskList->description,
                'is_completed'  => $taskList->is_completed,
                'fk_user'       => auth()->id()
            ]);

            $taskListModel->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => [
                    'id'            => $taskListModel->id,
                    'name'          => $taskListModel->name,
                    'description'   => $taskListModel->description,
                    'created_at'    => $taskListModel->created_at->format('d/m/Y H:i'),
                    'is_completed'  => $taskListModel->is_completed,
                    'user'          => auth()->user()->name
                ]
            ], 201);

        }catch (\Exception $exception){
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ],400);
        }
    }

    public function showTaskList($id): \Illuminate\Http\JsonResponse
    {
        $task_list = TaskList::query()
            ->where([
                'id'        =>  $id
            ])->first();

        if(!$task_list){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $taskListToUser = $this->getUserPermission($task_list->id, ['full', 'edit', 'view']);

        if($taskListToUser){
            return $taskListToUser;
        }

        $userCreated = $task_list->user()->where([
            'fk_task_list'  => $task_list->id,
            'permission'    => 'full'
        ])->first();

        return response()->json([
            'success'   => true,
            'message'   => 'show task',
            'data'      => [
                'id'            => $task_list->id,
                'name'          => $task_list->name,
                'description'   => $task_list->description,
                'created_at'    => $task_list->created_at->format('d/m/Y H:i'),
                'is_completed'  => $task_list->is_completed,
                'user'          => $userCreated->name
            ]
        ], 200);
    }

    public function updatedTaskList($taskList, $id): \Illuminate\Http\JsonResponse
    {
        $taskListModel = TaskList::query()->where([
            'id'        => $id
        ])->first();

        if(!$taskListModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found'
            ], 404);
        }

        $taskListToUser = $this->getUserPermission($taskListModel->id, ['full', 'edit']);

        if($taskListToUser){
            return $taskListToUser;
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

        $userCreated = $taskListModel->user()->where([
            'fk_task_list'  => $taskListModel->id,
            'permission'    => 'full'
        ])->first();

        return response()->json([
            'success'   => true,
            'message'   => 'update task',
            'data'      => [
                'id'            => $taskListModel->id,
                'name'          => $taskListModel->name,
                'description'   => $taskListModel->description,
                'created_at'    => $taskListModel->created_at->format('d/m/Y H:i'),
                'is_completed'  => $taskListModel->is_completed,
                'user'          => $userCreated->name
            ]
        ], 200);

    }

    public function destroyTaskList($id): \Illuminate\Http\JsonResponse
    {
        $taskListModel = TaskList::query()->where([
            'id'        => $id
        ])->first();

        if(!$taskListModel){
            return response()->json([
                'success'   => false,
                'message'   => 'Not found!'
            ], 404);
        }

        $taskListToUser = $this->getUserPermission($taskListModel->id, ['full']);

        if($taskListToUser){
            return $taskListToUser;
        }

        $taskListModel->delete();

        return response()->json([
            'success'   => true,
            'message'   => 'Deleted task',
        ], 204);
    }
}
