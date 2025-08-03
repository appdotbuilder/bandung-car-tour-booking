<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Tour;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredCars = Car::available()->take(3)->get();
        $featuredTours = Tour::available()->take(3)->get();
        
        return Inertia::render('welcome', [
            'featuredCars' => $featuredCars,
            'featuredTours' => $featuredTours
        ]);
    }
}