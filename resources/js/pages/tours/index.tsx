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
    tours: Tour[];
    [key: string]: unknown;
}

export default function ToursIndex({ tours }: Props) {
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
            <Head title="Bandung City Tours" />
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🗺️ Bandung City Tours
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Discover the beauty and culture of Bandung with our guided tours
                        </p>
                    </div>

                    {tours.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No tours available
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Please check back later for available tour packages.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tours.map((tour) => (
                                <div key={tour.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
                                    <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                        <span className="text-6xl">🏔️</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                            {tour.name}
                                        </h3>
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <span className="mr-2">⏱️</span>
                                                {tour.duration_hours} hours
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-300">
                                                <span className="mr-2">📍</span>
                                                <span className="text-sm">
                                                    {tour.places_array.slice(0, 2).join(', ')}
                                                    {tour.places_array.length > 2 && (
                                                        <span className="text-gray-500">
                                                            {' '}+{tour.places_array.length - 2} more
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            {tour.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                    {tour.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                    {formatPrice(tour.price_per_person)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                                            </div>
                                            <Link
                                                href={`/tours/${tour.id}`}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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