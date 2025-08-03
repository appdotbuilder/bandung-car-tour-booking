<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTourBookingRequest;
use App\Models\Tour;
use App\Models\TourBooking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TourBookingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tours = Tour::available()->get();
        
        return Inertia::render('bookings/tour-booking', [
            'tours' => $tours
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTourBookingRequest $request)
    {
        $tour = Tour::findOrFail($request->tour_id);
        
        $totalPrice = $request->number_of_people * $tour->price_per_person;

        $booking = TourBooking::create([
            'user_id' => Auth::id(),
            'tour_id' => $request->tour_id,
            'tour_date' => $request->tour_date,
            'tour_time' => $request->tour_time,
            'number_of_people' => $request->number_of_people,
            'total_price' => $totalPrice,
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'customer_email' => $request->customer_email,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Tour booking created successfully! We will contact you soon to confirm your booking.');
    }
}