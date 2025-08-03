<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Tour;
use Illuminate\Database\Seeder;

class CarRentalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create cars
        Car::factory()->count(10)->create();
        
        // Create tours
        Tour::factory()->count(8)->create();
    }
}