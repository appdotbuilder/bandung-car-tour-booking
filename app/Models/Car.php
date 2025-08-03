<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Car
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property int $passenger_capacity
 * @property float $daily_price
 * @property string|null $description
 * @property string|null $image_url
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CarBooking[] $bookings
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Car newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Car newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Car query()
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car wherePassengerCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereDailyPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Car available()
 * @method static \Database\Factories\CarFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Car extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'passenger_capacity',
        'daily_price',
        'description',
        'image_url',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'daily_price' => 'decimal:2',
        'passenger_capacity' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the bookings for the car.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(CarBooking::class);
    }

    /**
     * Scope a query to only include available cars.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
}