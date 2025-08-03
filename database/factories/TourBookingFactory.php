<?php

namespace Database\Factories;

use App\Models\Tour;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TourBooking>
 */
class TourBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $numberOfPeople = fake()->numberBetween(1, 8);
        $pricePerPerson = fake()->numberBetween(120000, 250000);
        
        return [
            'user_id' => User::factory(),
            'tour_id' => Tour::factory(),
            'tour_date' => fake()->dateTimeBetween('now', '+1 month'),
            'tour_time' => fake()->time('H:i'),
            'number_of_people' => $numberOfPeople,
            'total_price' => $numberOfPeople * $pricePerPerson,
            'customer_name' => fake()->name(),
            'customer_phone' => fake()->phoneNumber(),
            'customer_email' => fake()->email(),
            'status' => fake()->randomElement(['pending', 'confirmed']),
        ];
    }
}