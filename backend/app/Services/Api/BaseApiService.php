<?php

namespace app\Services\Api;

use App\Models\Api\TaskListUser;

class BaseApiService
{
    public function getUserPermission($id, $permission){
        $user       = auth()->user();

        $taskListToUser = TaskListUser::query()
            ->where([
                'fk_user'       => $user->id,
                'fk_task_list'  => $id
            ])
            ->whereIn('permission', $permission)
            ->first();

        if(!$taskListToUser){
            return response()->json([
                'success'   => false,
                'message'   => 'Access denied!'
            ], 403);
        }

        return false;
    }
}
