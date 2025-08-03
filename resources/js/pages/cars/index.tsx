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
    cars: Car[];
    [key: string]: unknown;
}

export default function CarsIndex({ cars }: Props) {
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
            <Head title="Car Rental - Bandung" />
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🚗 Available Cars for Rent
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Choose from our premium fleet of well-maintained vehicles
                        </p>
                    </div>

                    {cars.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🚗</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No cars available
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Please check back later for available vehicles.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cars.map((car) => (
                                <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <span className="text-6xl">🚗</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                            {car.name}
                                        </h3>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                                    {car.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 flex items-center">
                                                <span className="mr-2">👥</span>
                                                {car.passenger_capacity} passengers
                                            </p>
                                            {car.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                    {car.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {formatPrice(car.daily_price)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                                            </div>
                                            <Link
                                                href={`/cars/${car.id}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}