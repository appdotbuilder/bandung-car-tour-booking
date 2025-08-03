import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Car {
    id: number;
    name: string;
    type: string;
    passenger_capacity: number;
    daily_price: number;
    description?: string;
    image_url?: string;
    [key: string]: unknown;
}

interface Props {
    car: Car;
    [key: string]: unknown;
}

export default function CarShow({ car }: Props) {
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
            <Head title={`${car.name} - Car Rental`} />
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
                                    href="/tours"
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Tours
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                            <span>→</span>
                            <Link href="/cars" className="hover:text-blue-600 dark:hover:text-blue-400">Cars</Link>
                            <span>→</span>
                            <span className="text-gray-900 dark:text-white">{car.name}</span>
                        </div>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Car Image */}
                        <div className="space-y-4">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <span className="text-8xl">🚗</span>
                            </div>
                        </div>

                        {/* Car Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {car.name}
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-200">
                                        {car.type}
                                    </span>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    🔧 Specifications
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Vehicle Type:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{car.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Passenger Capacity:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{car.passenger_capacity} people</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Daily Rate:</span>
                                        <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">
                                            {formatPrice(car.daily_price)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {car.description && (
                                <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📋 Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {car.description}
                                    </p>
                                </div>
                            )}

                            {/* Features */}
                            <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ✨ Included Features
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Air Conditioning</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">GPS Navigation</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">Insurance Included</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>✅</span>
                                        <span className="text-gray-600 dark:text-gray-300">24/7 Support</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Button */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                <div className="text-center space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Starting from</p>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatPrice(car.daily_price)}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
                                    </div>
                                    {auth.user ? (
                                        <Link
                                            href="/book-car"
                                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                                        >
                                            🚗 Book This Car
                                        </Link>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Please login to make a booking
                                            </p>
                                            <Link
                                                href={route('login')}
                                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
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