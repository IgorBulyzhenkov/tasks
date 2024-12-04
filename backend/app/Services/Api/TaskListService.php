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
            ->skip(($page - 1) * $limit)
            ->take($limit)
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

            $userWithPermission = $task->usersWithPermission->first();

            return [
                'id'            => $task->id,
                'name'          => $task->name,
                'description'   => $task->description,
                'is_completed'  => $task->is_completed,
                'created_at'    => $task->created_at->format('d/m/Y H:i'),
                'updated_at'    => $task->updated_at->format('d/m/Y H:i'),
                'user'          => $userWithPermission->name ?? null,
                'permission'    => $userWithPermission->pivot->permission ?? null,
            ];
        });

        return response()->json([
            'success' => true,
            'data'    => [
                'data'          => $data,
                'current_page'  => $page,
                'limit'         => $limit,
                'total_records' => $taskLists->count(),
                'total_pages'   => ceil($taskLists->count() / $limit),
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
                    'user'          => $taskListModel->fkUser->name
                ]
            ], 201);

        }catch (\Exception $exception){
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ],200);
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

        return response()->json([
            'success'   => true,
            'message'   => 'show task',
            'data'      => [
                'id'            => $task_list->id,
                'name'          => $task_list->name,
                'description'   => $task_list->description,
                'created_at'    => $task_list->created_at->format('d/m/Y H:i'),
                'is_completed'  => $task_list->is_completed,
                'user'          => $taskListToUser->user->name
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

        return response()->json([
            'success'   => true,
            'message'   => 'update task',
            'data'      => [
                'id'            => $taskListModel->id,
                'name'          => $taskListModel->name,
                'description'   => $taskListModel->description,
                'created_at'    => $taskListModel->created_at->format('d/m/Y H:i'),
                'is_completed'  => $taskListModel->is_completed,
                'user'          => $taskListModel->fkUser->name
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
