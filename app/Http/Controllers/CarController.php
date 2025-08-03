<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::available()->get();
        
        return Inertia::render('cars/index', [
            'cars' => $cars
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return Inertia::render('cars/show', [
            'car' => $car
        ]);
    }
}