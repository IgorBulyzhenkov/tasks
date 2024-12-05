<?php

namespace App\Services\Api;

use App\Http\Requests\Api\TaskListUserPostRequest;
use App\Mail\Api\BindToTaskMail;
use App\Models\Api\TaskList;
use App\Models\Api\TaskListUser;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class TaskListUserService extends BaseApiService
{
    public function getUsersToTaskList($request): \Illuminate\Http\JsonResponse
    {
        $taskListToUser = $this->getUserPermission($request->query('fk_task_list'), ['full', 'view_list']);

        if($taskListToUser){
            return $taskListToUser;
        }

        $tasks = TaskListUser::query()->where('fk_task_list', $request->query('fk_task_list'))->get();

        if(!$tasks){
            return response()->json([
                'success'   => false,
                'message'   => 'No found!'
            ],404);
        }

        $data = collect([]);

        foreach ($tasks as $task){
            $newData = [
                'id'            => $task->user->id,
                'name'          => $task->user->name,
                'permission'    => $task->permission,
            ];

            $data[] = $newData;
        }

        return response()->json([
            'success'   => true,
            'message'   => 'Users find successfully!',
            'data'      => $data
        ],200);
    }

    public function searchUser($request): \Illuminate\Http\JsonResponse
    {
        $users = User::query()
            ->where('name', 'like', '%' . $request->query('name') . '%')
            ->where('verification_token', null)
            ->whereNotIn('id', function ($query) {
                $query->select('fk_user')
                    ->from('task_list_user');
            })
            ->get();

        $data = collect([]);

        foreach ($users as $user){

            if($user->id !== auth()->id()){
                $newData = [
                    'name'  => $user->name,
                    'id'    => $user->id,
                ];

                $data[] = $newData;
            }

        }

        return response()->json([
            'status'    => true,
            'data'      => $data
        ], 200);
    }

    public function bindToTask ($data): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();

            $request = new TaskListUserPostRequest();

            $rules = $request->rules();

            $validator = Validator::make($data->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->getMessages()
                ], 400);
            }

            $bindModel = new TaskListUser();

            $bindModel->fill([
                'fk_user'       => $data->fk_user,
                'fk_task_list'  => $data->fk_task_list,
                'permission'    => $data->permission,
            ]);

            if($bindModel->save()){

                $userModel = User::query()->where('id', $data->fk_user)->first();

                $taskModel = TaskList::query()->where('id', $data->fk_task_list)->first();

                Mail::to($userModel->fresh()->email)
                    ->send(new BindToTaskMail($userModel->fresh(), $taskModel->fresh()));
            }


            DB::commit();

            return response()->json([
                'status'    => true,
                'message'   => 'User bind to task list successfully'
            ], 201);

        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $exception->getMessage()
            ],400);
        }
    }
}
