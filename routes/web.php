<?php

use App\Http\Controllers\CarBookingController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TourBookingController;
use App\Http\Controllers\TourController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with featured cars and tours
Route::get('/', [HomeController::class, 'index'])->name('home');

// Car rental routes
Route::controller(CarController::class)->group(function () {
    Route::get('/cars', 'index')->name('cars.index');
    Route::get('/cars/{car}', 'show')->name('cars.show');
});

// Tour routes
Route::controller(TourController::class)->group(function () {
    Route::get('/tours', 'index')->name('tours.index');
    Route::get('/tours/{tour}', 'show')->name('tours.show');
});

// Booking routes (requires authentication)
Route::middleware('auth')->group(function () {
    Route::controller(CarBookingController::class)->group(function () {
        Route::get('/book-car', 'create')->name('car-bookings.create');
        Route::post('/book-car', 'store')->name('car-bookings.store');
    });
    
    Route::controller(TourBookingController::class)->group(function () {
        Route::get('/book-tour', 'create')->name('tour-bookings.create');
        Route::post('/book-tour', 'store')->name('tour-bookings.store');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
