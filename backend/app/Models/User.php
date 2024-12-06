<?php

namespace App\Models;

use App\Models\Api\TaskList;
use App\Models\Api\TaskListUser;
use App\Models\Api\Tasks;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nickName',
        'email',
        'password',
        'verification_token',
        'email_verified_at'
    ];

    public function taskList(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TaskList::class, 'fk_task_list');
    }

    public function taskListUser(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(
            TaskListUser::class,
            'task_list_user',
            'fk_task_list',
            'fk_user'
        )->withPivot('permission');
    }

    public function tasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Tasks::class,  'fk_user');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
