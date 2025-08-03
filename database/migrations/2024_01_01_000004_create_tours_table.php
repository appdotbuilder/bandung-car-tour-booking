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
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('places_visited')->comment('JSON array of places visited');
            $table->integer('duration_hours')->comment('Tour duration in hours');
            $table->decimal('price_per_person', 10, 2)->comment('Price per person in IDR');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->enum('status', ['available', 'unavailable'])->default('available');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index(['status', 'duration_hours']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};