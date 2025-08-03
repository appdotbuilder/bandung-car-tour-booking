<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CarBooking
 *
 * @property int $id
 * @property int $user_id
 * @property int $car_id
 * @property string $start_date
 * @property string $end_date
 * @property int $total_days
 * @property float $total_price
 * @property string $customer_name
 * @property string $customer_phone
 * @property string $customer_email
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Car $car
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking query()
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereCarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereTotalDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereCustomerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereCustomerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CarBooking whereUpdatedAt($value)
 * @method static \Database\Factories\CarBookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CarBooking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'car_id',
        'start_date',
        'end_date',
        'total_days',
        'total_price',
        'customer_name',
        'customer_phone',
        'customer_email',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_days' => 'integer',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the car that was booked.
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}