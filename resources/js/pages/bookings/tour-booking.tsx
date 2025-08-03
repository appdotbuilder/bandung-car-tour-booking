import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { FormEventHandler, useState } from 'react';

interface Tour {
    id: number;
    name: string;
    places_visited: string;
    duration_hours: number;
    price_per_person: number;
    places_array: string[];
    [key: string]: unknown;
}

interface Props {
    tours: Tour[];
    [key: string]: unknown;
}

export default function TourBooking({ tours }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { data, setData, post, processing, errors } = useForm({
        tour_id: '',
        tour_date: '',
        tour_time: '09:00',
        number_of_people: 1,
        customer_name: auth.user?.name || '',
        customer_phone: '',
        customer_email: auth.user?.email || '',
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const calculateTotal = () => {
        if (!selectedTour || !data.number_of_people) return;

        const total = data.number_of_people * selectedTour.price_per_person;
        setTotalPrice(total);
    };

    const handleTourSelect = (tour: Tour) => {
        setSelectedTour(tour);
        setData('tour_id', tour.id.toString());
        calculateTotal();
    };

    const handlePeopleChange = (value: number) => {
        setData('number_of_people', Math.max(1, value));
        setTimeout(calculateTotal, 100);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tour-bookings.store'));
    };

    const today = new Date().toISOString().split('T')[0];

    const timeSlots = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'
    ];

    return (
        <>
            <Head title="Book a Tour - Bandung Tours" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href="/" className="flex items-center space-x-2">
                                <span className="text-2xl">🚗</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Bandung Rental & Tours
                                </h1>
                            </Link>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href="/tours"
                                    className="text-green-600 font-medium dark:text-green-400"
                                >
                                    Tours
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🗺️ Book a Tour
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Select a tour package and schedule your adventure
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Tour Selection */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                1. Select a Tour Package
                            </h2>
                            {errors.tour_id && (
                                <div className="mb-4 text-red-600 text-sm">{errors.tour_id}</div>
                            )}
                            <div className="space-y-4">
                                {tours.map((tour) => (
                                    <div
                                        key={tour.id}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                            selectedTour?.id === tour.id
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                                : 'border-gray-200 hover:border-green-300 dark:border-gray-600 dark:hover:border-green-500'
                                        }`}
                                        onClick={() => handleTourSelect(tour)}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="text-4xl">🏔️</div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                                    {tour.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                    Duration: {tour.duration_hours} hours
                                                </p>
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Places to visit:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {tour.places_array.map((place, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs dark:bg-gray-700 dark:text-gray-300"
                                                            >
                                                                {place}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="font-bold text-green-600 dark:text-green-400 text-lg">
                                                    {formatPrice(tour.price_per_person)}/person
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule Selection */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                2. Select Schedule
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tour Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.tour_date}
                                        onChange={(e) => setData('tour_date', e.target.value)}
                                        min={today}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.tour_date && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.tour_date}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Preferred Time
                                    </label>
                                    <select
                                        value={data.tour_time}
                                        onChange={(e) => setData('tour_time', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        {timeSlots.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tour_time && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.tour_time}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Number of People */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                3. Number of People
                            </h2>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handlePeopleChange(data.number_of_people - 1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center dark:bg-gray-600 dark:hover:bg-gray-500"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">
                                    {data.number_of_people}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handlePeopleChange(data.number_of_people + 1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center dark:bg-gray-600 dark:hover:bg-gray-500"
                                >
                                    +
                                </button>
                                <span className="text-gray-600 dark:text-gray-300">people</span>
                            </div>
                            {errors.number_of_people && (
                                <div className="mt-2 text-red-600 text-sm">{errors.number_of_people}</div>
                            )}
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                4. Customer Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.customer_name && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.customer_name}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.customer_phone && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.customer_phone}</div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.customer_email && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.customer_email}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        {selectedTour && totalPrice > 0 && (
                            <div className="bg-green-50 rounded-xl p-6 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    📋 Booking Summary
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Tour:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{selectedTour.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{selectedTour.duration_hours} hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Price per Person:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{formatPrice(selectedTour.price_per_person)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Number of People:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{data.number_of_people}</span>
                                    </div>
                                    <div className="border-t border-green-200 pt-2 dark:border-green-700">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                                            <span className="text-lg font-bold text-green-600 dark:text-green-400">{formatPrice(totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing || !selectedTour || !data.tour_date}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Processing...' : '🗺️ Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}