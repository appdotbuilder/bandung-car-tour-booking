<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CarBooking;
use App\Models\TourBooking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        $carBookings = CarBooking::with('car')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
            
        $tourBookings = TourBooking::with('tour')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'carBookings' => $carBookings,
            'tourBookings' => $tourBookings,
        ]);
    }
}