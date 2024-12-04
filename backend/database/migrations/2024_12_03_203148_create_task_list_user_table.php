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
        Schema::create('task_list_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fk_user')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('fk_task_list')->constrained('task_list', 'id')->onDelete('cascade');
            $table->enum('permission', ['view', 'edit', 'edit_list', 'full'])->default('edit_list');
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
