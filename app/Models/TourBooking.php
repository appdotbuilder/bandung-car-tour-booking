<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TourBooking
 *
 * @property int $id
 * @property int $user_id
 * @property int $tour_id
 * @property string $tour_date
 * @property string $tour_time
 * @property int $number_of_people
 * @property float $total_price
 * @property string $customer_name
 * @property string $customer_phone
 * @property string $customer_email
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Tour $tour
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking query()
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereTourId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereTourDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereTourTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereNumberOfPeople($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereCustomerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereCustomerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TourBooking whereUpdatedAt($value)
 * @method static \Database\Factories\TourBookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TourBooking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'tour_id',
        'tour_date',
        'tour_time',
        'number_of_people',
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
        'tour_date' => 'date',
        'tour_time' => 'datetime:H:i',
        'number_of_people' => 'integer',
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
     * Get the tour that was booked.
     */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}