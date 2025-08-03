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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->comment('Car type (sedan, suv, mpv, etc.)');
            $table->integer('passenger_capacity')->comment('Maximum number of passengers');
            $table->decimal('daily_price', 10, 2)->comment('Daily rental price in IDR');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->enum('status', ['available', 'unavailable'])->default('available');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('type');
            $table->index('status');
            $table->index(['status', 'passenger_capacity']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};