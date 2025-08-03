import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Tour {
    id: number;
    name: string;
    places_visited: string;
    duration_hours: number;
    price_per_person: number;
    description?: string;
    image_url?: string;
    places_array: string[];
    [key: string]: unknown;
}

interface Props {
    tour: Tour;
    [key: string]: unknown;
}

export default function TourShow({ tour }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title={`${tour.name} - Bandung Tours`} />
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
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Cars
                                </Link>
                                <Link
                                    href="/tours"
                                    className="text-green-600 font-medium dark:text-green-400"
                                >
                                    Tours
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">Home</Link>
                            <span>→</span>
                            <Link href="/tours" className="hover:text-green-600 dark:hover:text-green-400">Tours</Link>
                            <span>→</span>
                            <span className="text-gray-900 dark:text-white">{tour.name}</span>
                        </div>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Tour Image */}
                        <div className="space-y-4">
                            <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                <span className="text-8xl">🏔️</span>
                            </div>
                        </div>

                        {/* Tour Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {tour.name}
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-200">
                                        {tour.duration_hours} hours
                                    </span>
                                </div>
                            </div>

                            {/* Tour Overview */}
                            <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📋 Tour Overview
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{tour.duration_hours} hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Price per Person:</span>
                                        <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                                            {formatPrice(tour.price_per_person)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Places to Visit */}
                            <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📍 Places to Visit
                                </h3>
                                <div className="space-y-2">
                                    {tour.places_array.map((place, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium dark:bg-green-900 dark:text-green-400">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">{place}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            {tour.description && (
                                <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📖 Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {tour.description}
                                    </p>
                                </div>
                            )}

                            {/* What's Included */}
                            <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ✨ What's Included
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Professional tour guide</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Transportation</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Entry tickets to attractions</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Bottled water</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>❌</span>
                                        <span className="text-gray-500 dark:text-gray-400">Meals (available for purchase)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>❌</span>
                                        <span className="text-gray-500 dark:text-gray-400">Personal expenses</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Button */}
                            <div className="bg-green-50 rounded-xl p-6 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                                <div className="text-center space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Starting from</p>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                            {formatPrice(tour.price_per_person)}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                                    </div>
                                    {auth.user ? (
                                        <Link
                                            href="/book-tour"
                                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors block text-center"
                                        >
                                            🗺️ Book This Tour
                                        </Link>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Please login to make a booking
                                            </p>
                                            <Link
                                                href={route('login')}
                                                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors block text-center"
                                            >
                                                Login to Book
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}