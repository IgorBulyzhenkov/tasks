<?php

namespace App\Models\Api;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskListUser extends Model
{
    use HasFactory;

    protected $table = 'task_list_user';

    protected $fillable = [
        'fk_user',
        'fk_task_list',
        'permission'
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'fk_user', 'id');
    }

    public function taskList(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(TaskList::class, 'fk_task_list', 'id');
    }

    public function taskListUsers(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(TaskList::class, 'fk_task_list', 'id');
    }
}
