import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Car {
    id: number;
    name: string;
    type: string;
    passenger_capacity: number;
    daily_price: number;
    image_url?: string;
    [key: string]: unknown;
}

interface Tour {
    id: number;
    name: string;
    places_visited: string;
    duration_hours: number;
    price_per_person: number;
    image_url?: string;
    places_array: string[];
    [key: string]: unknown;
}

interface Props {
    featuredCars: Car[];
    featuredTours: Tour[];
    [key: string]: unknown;
}

export default function Welcome({ featuredCars, featuredTours }: Props) {
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
            <Head title="Bandung Car Rental & Tours">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-900/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🚗</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Bandung Rental & Tours
                                </h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            🌟 Explore Beautiful Bandung
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                            Discover the Paris of Java with our premium car rental services and guided city tours. 
                            From scenic mountain drives to cultural heritage sites, we make your Bandung adventure unforgettable.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/cars"
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                            >
                                🚗 Rent a Car
                            </Link>
                            <Link
                                href="/tours"
                                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
                            >
                                🗺️ Book a Tour
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            ✨ Why Choose Us?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800">
                                <div className="text-4xl mb-4">🚗</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Premium Fleet</h3>
                                <p className="text-gray-600 dark:text-gray-300">Well-maintained vehicles from sedans to minivans for all your needs</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800">
                                <div className="text-4xl mb-4">👨‍🦽</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expert Guides</h3>
                                <p className="text-gray-600 dark:text-gray-300">Local experts who know the best spots and hidden gems in Bandung</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-xl shadow-sm dark:bg-gray-800">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Best Prices</h3>
                                <p className="text-gray-600 dark:text-gray-300">Competitive rates with no hidden fees - transparent pricing</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Cars */}
                {featuredCars.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    🚗 Featured Cars
                                </h2>
                                <Link
                                    href="/cars"
                                    className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400"
                                >
                                    View All Cars →
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {featuredCars.map((car) => (
                                    <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800">
                                        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                            <span className="text-6xl">🚗</span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{car.name}</h3>
                                            <div className="space-y-2 mb-4">
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">Type:</span> {car.type}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">Capacity:</span> {car.passenger_capacity} passengers
                                                </p>
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                    {formatPrice(car.daily_price)}/day
                                                </p>
                                            </div>
                                            <Link
                                                href={`/cars/${car.id}`}
                                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Tours */}
                {featuredTours.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    🗺️ Popular Tours
                                </h2>
                                <Link
                                    href="/tours"
                                    className="text-green-600 hover:text-green-700 font-medium dark:text-green-400"
                                >
                                    View All Tours →
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {featuredTours.map((tour) => (
                                    <div key={tour.id} className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800">
                                        <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                            <span className="text-6xl">🏔️</span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{tour.name}</h3>
                                            <div className="space-y-2 mb-4">
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">Duration:</span> {tour.duration_hours} hours
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">Visits:</span> {tour.places_array.slice(0, 2).join(', ')}
                                                    {tour.places_array.length > 2 && '...'}
                                                </p>
                                                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    {formatPrice(tour.price_per_person)}/person
                                                </p>
                                            </div>
                                            <Link
                                                href={`/tours/${tour.id}`}
                                                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            🎯 Ready for Your Bandung Adventure?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Join thousands of satisfied customers who've explored Bandung with us. 
                            Book now and create unforgettable memories!
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    🚀 Get Started Now
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    Already have an account?
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-2xl">🚗</span>
                            <h3 className="text-xl font-bold">Bandung Rental & Tours</h3>
                        </div>
                        <p className="text-gray-400 mb-8">
                            Your trusted partner for exploring the beautiful city of Bandung
                        </p>
                        <div className="border-t border-gray-800 pt-8">
                            <p className="text-gray-400">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}