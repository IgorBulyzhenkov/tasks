<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void

    {
        Schema::create('task_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fk_user')->constrained('users', 'id')->cascadeOnDelete();
            $table->foreignId('fk_task')->constrained('tasks', 'id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_list_user');
    }
};
