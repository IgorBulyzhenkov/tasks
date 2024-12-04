<?php

namespace App\Models\Api;

use App\Models\User;
use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $table = 'task_list';

    protected $fillable = [
        'name',
        'description',
        'is_completed',
        'fk_user'
    ];

    public function tasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Tasks::class, 'fk_task_list');
    }

    public function taskListUser(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TaskListUser::class, 'fk_task_list');
    }

    public function fkUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'fk_user');
    }

    public function usersWithPermission(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_list_user', 'fk_task_list', 'fk_user')
            ->withPivot('permission');
    }

    public static function boot(): void
    {
        static::deleting(function($model){
            $model->tasks()->delete();
        });

        self::created(function($model){
            TaskListUser::query()->create([
                'fk_task_list'  => $model->id,
                'fk_user'       => auth()->id(),
                'permission'    => 'full'
            ]);
        });

        parent::boot();
    }
}
