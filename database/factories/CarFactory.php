<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['Sedan', 'SUV', 'MPV', 'Hatchback', 'Minivan'];
        $type = fake()->randomElement($types);
        
        $names = [
            'Sedan' => ['Toyota Vios', 'Honda City', 'Nissan Almera'],
            'SUV' => ['Toyota Fortuner', 'Honda CR-V', 'Mitsubishi Pajero Sport'],
            'MPV' => ['Toyota Avanza', 'Honda Mobilio', 'Mitsubishi Xpander'],
            'Hatchback' => ['Toyota Yaris', 'Honda Jazz', 'Nissan March'],
            'Minivan' => ['Toyota Hiace', 'Isuzu ELF', 'Mitsubishi L300']
        ];
        
        $capacities = [
            'Sedan' => 4,
            'SUV' => 7,
            'MPV' => 7,
            'Hatchback' => 4,
            'Minivan' => 12
        ];
        
        $prices = [
            'Sedan' => [300000, 400000],
            'SUV' => [500000, 700000],
            'MPV' => [350000, 450000],
            'Hatchback' => [250000, 350000],
            'Minivan' => [600000, 800000]
        ];
        
        return [
            'name' => fake()->randomElement($names[$type]),
            'type' => $type,
            'passenger_capacity' => $capacities[$type],
            'daily_price' => fake()->numberBetween($prices[$type][0], $prices[$type][1]),
            'description' => fake()->sentence(10),
            'image_url' => 'https://via.placeholder.com/400x300?text=' . urlencode($type),
            'status' => 'available',
        ];
    }
}