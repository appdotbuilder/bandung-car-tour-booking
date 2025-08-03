<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Tour
 *
 * @property int $id
 * @property string $name
 * @property string $places_visited
 * @property int $duration_hours
 * @property float $price_per_person
 * @property string|null $description
 * @property string|null $image_url
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TourBooking[] $bookings
 * @property-read array $places_array
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Tour newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tour newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tour query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour wherePlacesVisited($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereDurationHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour wherePricePerPerson($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tour available()
 * @method static \Database\Factories\TourFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Tour extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'places_visited',
        'duration_hours',
        'price_per_person',
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
        'price_per_person' => 'decimal:2',
        'duration_hours' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the bookings for the tour.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(TourBooking::class);
    }

    /**
     * Get the places visited as an array.
     *
     * @return array
     */
    public function getPlacesArrayAttribute(): array
    {
        return json_decode($this->places_visited, true) ?? [];
    }

    /**
     * Scope a query to only include available tours.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
}