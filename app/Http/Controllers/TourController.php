<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Inertia\Inertia;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tours = Tour::available()->get();
        
        return Inertia::render('tours/index', [
            'tours' => $tours
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tour $tour)
    {
        return Inertia::render('tours/show', [
            'tour' => $tour
        ]);
    }
}