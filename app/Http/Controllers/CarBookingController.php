<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCarBookingRequest;
use App\Models\Car;
use App\Models\CarBooking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CarBookingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cars = Car::available()->get();
        
        return Inertia::render('bookings/car-booking', [
            'cars' => $cars
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarBookingRequest $request)
    {
        $car = Car::findOrFail($request->car_id);
        
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        $totalDays = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $totalDays * $car->daily_price;

        $booking = CarBooking::create([
            'user_id' => Auth::id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_days' => $totalDays,
            'total_price' => $totalPrice,
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'customer_email' => $request->customer_email,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Car booking created successfully! We will contact you soon to confirm your booking.');
    }
}