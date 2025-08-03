<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tour>
 */
class TourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tours = [
            [
                'name' => 'Bandung City Highlights',
                'places' => ['Gedung Sate', 'Alun-alun Bandung', 'Braga Street', 'Factory Outlets'],
                'duration' => 6,
                'price' => 150000
            ],
            [
                'name' => 'Tea Plantation Tour',
                'places' => ['Ciwidey Tea Plantation', 'Kawah Putih', 'Patenggang Lake'],
                'duration' => 8,
                'price' => 200000
            ],
            [
                'name' => 'Culinary Adventure',
                'places' => ['Kampung Gajah', 'Local Food Markets', 'Traditional Restaurants'],
                'duration' => 5,
                'price' => 120000
            ],
            [
                'name' => 'Mountain Adventure',
                'places' => ['Tangkuban Parahu', 'Hot Springs', 'Strawberry Gardens'],
                'duration' => 10,
                'price' => 250000
            ],
            [
                'name' => 'Cultural Heritage Tour',
                'places' => ['Saung Angklung Udjo', 'Geological Museum', 'Traditional Markets'],
                'duration' => 7,
                'price' => 180000
            ]
        ];
        
        $tour = fake()->randomElement($tours);
        
        return [
            'name' => $tour['name'],
            'places_visited' => json_encode($tour['places']),
            'duration_hours' => $tour['duration'],
            'price_per_person' => $tour['price'],
            'description' => fake()->paragraph(3),
            'image_url' => 'https://via.placeholder.com/400x300?text=' . urlencode($tour['name']),
            'status' => 'available',
        ];
    }
}