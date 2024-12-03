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
        'fk_user',
        'is_completed'
    ];

    public function fkUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'fk_user');
    }

    public function tasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Tasks::class, 'fk_task_list');
    }

    public static function boot(): void
    {

        static::deleting(function($model){
            $model->tasks()->delete();
        });

        parent::boot();
    }
}
