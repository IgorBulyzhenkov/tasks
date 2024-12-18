<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class TaskListUserPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fk_user'       => ['required', 'string', 'exists:users,id'],
            'fk_task_list'  => ['required', 'string', 'exists:task_list,id'],
            'permission'    => ['required', 'in:edit,view,view_list'],
        ];
    }
}
