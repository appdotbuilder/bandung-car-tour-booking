<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarBooking>
 */
class CarBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+1 month');
        $endDate = fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +7 days');
        $totalDays = (int) $startDate->diff($endDate)->days + 1;
        
        return [
            'user_id' => User::factory(),
            'car_id' => Car::factory(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_days' => $totalDays,
            'total_price' => $totalDays * fake()->numberBetween(250000, 800000),
            'customer_name' => fake()->name(),
            'customer_phone' => fake()->phoneNumber(),
            'customer_email' => fake()->email(),
            'status' => fake()->randomElement(['pending', 'confirmed']),
        ];
    }
}