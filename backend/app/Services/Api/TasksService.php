<?php

namespace App\Services\Api;

use App\Http\Requests\Api\TasksPostRequest;
use App\Http\Requests\Api\TasksPutRequest;
use App\Models\Api\TaskListUser;
use App\Models\Api\Tasks;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TasksService extends BaseApiService
{
    public function getTasks($request): \Illuminate\Http\JsonResponse
    {
        $query      = Tasks::query();

        $total      = $query->count();

        if($total === 0){
            return response()->json([
                'success'   => false,
                'message'   => 'No results found',
                'data'      => []
            ],200);
        }

        $taskListToUser = $this->getUserPermission($request->query('fk_task_list'), ['full', 'edit', 'view']);

        if ($taskListToUser) {
            return $taskListToUser;
        }

        $taskListExists = Tasks::where('fk_task_list', $request->query('fk_task_list'))->exists();

        if (!$taskListExists) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid task list ID.',
            ], 400);
        }

        $page       = (int)$request->query('page', 1);
        $limit      = (int)$request->query('limit', 10);

        $totalPages = ceil($total / $limit);

        $data       = collect([]);

        $tasks      = $query
            ->skip(($page - 1) * $limit)
            ->where([
                'fk_task_list' => $request->query('fk_task_list'),
            ])
            ->take($limit)
            ->get();

        $taskListToUser = TaskListUser::query()
            ->select('permission')
            ->where([
                'fk_user'       => auth()->id(),
                'fk_task_list'  => $request->query('fk_task_list')
            ])
            ->first();

        foreach ($tasks as $task){
            $newData = [
                'id'            => $task->id,
                'title'         => $task->title,
                'description'   => $task->description,
                'is_completed'  => $task->is_completed,
                'created_at'    => $task->created_at->format('d/m/Y H:i'),
                'updated_at'    => $task->updated_at->format('d/m/Y H:i'),
                'task_list'     => $task->fkTaskList->name,
                'userName'      => $task->fkUser->name,
                'permission'    => $taskListToUser->permission,
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
        try {

            DB::beginTransaction();

            $request = new TasksPostRequest();

            $rules = $request->rules();

            $validator = Validator::make($tasks->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->getMessages()
                ], 400);
            }

            $taskListToUser = $this->getUserPermission($tasks->fk_task_list, ['full']);

            if ($taskListToUser) {
                return $taskListToUser;
            }

            $tasksModel = new Tasks();

            $tasksModel->fill([
                'title'         => $tasks->title,
                'description'   => $tasks->description,
                'fk_task_list'  => $tasks->fk_task_list,
                'is_completed'  => $tasks->is_completed,
                'fk_user'       => auth()->id()
            ]);

            $tasksModel->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $tasksModel->id
                ]
            ], 201);

        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ],400);
        }
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

        $taskListToUser = $this->getUserPermission($tasks->fk_task_list, ['full', 'edit', 'view']);

        if($taskListToUser){
            return $taskListToUser;
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
                'is_completed'  => $tasks->is_completed,
                'user'          => $tasks->fkUser->name,
                'taskList'      => $tasks->fkTaskList->name,
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

        $taskListToUser = $this->getUserPermission($tasksModel->fk_task_list, ['full', 'edit']);

        if($taskListToUser){
            return $taskListToUser;
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

        $taskListToUser = $this->getUserPermission($tasksModel->fk_task_list, ['full']);

        if($taskListToUser){
            return $taskListToUser;
        }

        $tasksModel->delete();

        return response()->json([
            'success'   => true,
            'message'   => 'Deleted task',
        ], 204);
    }
}
