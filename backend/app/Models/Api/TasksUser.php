<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksUser extends Model
{
    use HasFactory;

    protected $table = 'tasks_user';

    protected $fillable = [
        'fk_user',
        'fk_tasks'
    ];

}
