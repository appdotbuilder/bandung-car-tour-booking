import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { FormEventHandler, useState } from 'react';

interface Car {
    id: number;
    name: string;
    type: string;
    passenger_capacity: number;
    daily_price: number;
    [key: string]: unknown;
}

interface Props {
    cars: Car[];
    [key: string]: unknown;
}

export default function CarBooking({ cars }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { data, setData, post, processing, errors } = useForm({
        car_id: '',
        start_date: '',
        end_date: '',
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
        if (!selectedCar || !data.start_date || !data.end_date) return;

        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include start date

        if (daysDiff > 0) {
            const total = daysDiff * selectedCar.daily_price;
            setTotalPrice(total);
        }
    };

    const handleCarSelect = (car: Car) => {
        setSelectedCar(car);
        setData('car_id', car.id.toString());
        calculateTotal();
    };

    const handleDateChange = (field: 'start_date' | 'end_date', value: string) => {
        setData(field, value);
        setTimeout(calculateTotal, 100); // Small delay to ensure state is updated
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('car-bookings.store'));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Head title="Book a Car - Bandung Rental" />
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
                                    href="/cars"
                                    className="text-blue-600 font-medium dark:text-blue-400"
                                >
                                    Cars
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                            🚗 Book a Car
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Select a car and fill in your booking details
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Car Selection */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                1. Select a Car
                            </h2>
                            {errors.car_id && (
                                <div className="mb-4 text-red-600 text-sm">{errors.car_id}</div>
                            )}
                            <div className="grid md:grid-cols-2 gap-4">
                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                            selectedCar?.id === car.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-500'
                                        }`}
                                        onClick={() => handleCarSelect(car)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-3xl">🚗</div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {car.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {car.type} • {car.passenger_capacity} passengers
                                                </p>
                                                <p className="font-bold text-blue-600 dark:text-blue-400">
                                                    {formatPrice(car.daily_price)}/day
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                2. Select Dates
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => handleDateChange('start_date', e.target.value)}
                                        min={today}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.start_date && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.start_date}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => handleDateChange('end_date', e.target.value)}
                                        min={data.start_date || today}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.end_date && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.end_date}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                3. Customer Information
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.customer_email && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.customer_email}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        {selectedCar && totalPrice > 0 && (
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    📋 Booking Summary
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Car:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{selectedCar.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Daily Rate:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{formatPrice(selectedCar.daily_price)}</span>
                                    </div>
                                    {data.start_date && data.end_date && (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {Math.ceil((new Date(data.end_date).getTime() - new Date(data.start_date).getTime()) / (1000 * 3600 * 24)) + 1} days
                                                </span>
                                            </div>
                                            <div className="border-t border-blue-200 pt-2 dark:border-blue-700">
                                                <div className="flex justify-between">
                                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatPrice(totalPrice)}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing || !selectedCar || !data.start_date || !data.end_date}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Processing...' : '🚗 Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}