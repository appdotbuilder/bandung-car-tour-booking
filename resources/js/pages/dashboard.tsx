import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Car {
    id: number;
    name: string;
    type: string;
    daily_price: number;
    [key: string]: unknown;
}

interface Tour {
    id: number;
    name: string;
    duration_hours: number;
    price_per_person: number;
    [key: string]: unknown;
}

interface CarBooking {
    id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    total_price: number;
    status: string;
    car: Car;
    [key: string]: unknown;
}

interface TourBooking {
    id: number;
    tour_date: string;
    tour_time: string;
    number_of_people: number;
    total_price: number;
    status: string;
    tour: Tour;
    [key: string]: unknown;
}

interface Props {
    carBookings: CarBooking[];
    tourBookings: TourBooking[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ carBookings, tourBookings }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
            case 'confirmed':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">🚗 Welcome to Your Dashboard!</h1>
                    <p className="text-blue-100">
                        Manage your car rentals and tour bookings in one place. Ready for your next Bandung adventure?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-4">
                    <Link
                        href="/book-car"
                        className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors dark:bg-blue-900/20 dark:border-blue-800"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">🚗</div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Rent a Car</h3>
                                <p className="text-blue-700 dark:text-blue-300">Book your perfect vehicle</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/book-tour"
                        className="bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors dark:bg-green-900/20 dark:border-green-800"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">🗺️</div>
                            <div>
                                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Book a Tour</h3>
                                <p className="text-green-700 dark:text-green-300">Explore Bandung with expert guides</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Bookings */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Car Bookings */}
                    <div className="bg-white rounded-xl shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    🚗 Car Rentals
                                </h2>
                                <Link
                                    href="/cars"
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium dark:text-blue-400"
                                >
                                    View All →
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {carBookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🚗</div>
                                    <p className="text-gray-500 dark:text-gray-400">No car bookings yet</p>
                                    <Link
                                        href="/book-car"
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block dark:text-blue-400"
                                    >
                                        Book your first car
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {carBookings.map((booking) => (
                                        <div key={booking.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-600">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {booking.car.name}
                                                </h3>
                                                <span className={getStatusBadge(booking.status)}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                <p>📅 {formatDate(booking.start_date)} - {formatDate(booking.end_date)}</p>
                                                <p>⏱️ {booking.total_days} days</p>
                                                <p className="font-semibold text-blue-600 dark:text-blue-400">
                                                    💰 {formatPrice(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tour Bookings */}
                    <div className="bg-white rounded-xl shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    🗺️ Tour Bookings
                                </h2>
                                <Link
                                    href="/tours"
                                    className="text-green-600 hover:text-green-700 text-sm font-medium dark:text-green-400"
                                >
                                    View All →
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {tourBookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🗺️</div>
                                    <p className="text-gray-500 dark:text-gray-400">No tour bookings yet</p>
                                    <Link
                                        href="/book-tour"
                                        className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 inline-block dark:text-green-400"
                                    >
                                        Book your first tour
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tourBookings.map((booking) => (
                                        <div key={booking.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-600">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {booking.tour.name}
                                                </h3>
                                                <span className={getStatusBadge(booking.status)}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                <p>📅 {formatDate(booking.tour_date)} at {booking.tour_time}</p>
                                                <p>👥 {booking.number_of_people} people</p>
                                                <p>⏱️ {booking.tour.duration_hours} hours</p>
                                                <p className="font-semibold text-green-600 dark:text-green-400">
                                                    💰 {formatPrice(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">🚗</div>
                            <div>
                                <p className="text-sm text-blue-600 dark:text-blue-400">Total Car Bookings</p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{carBookings.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">🗺️</div>
                            <div>
                                <p className="text-sm text-green-600 dark:text-green-400">Total Tour Bookings</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{tourBookings.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">✨</div>
                            <div>
                                <p className="text-sm text-purple-600 dark:text-purple-400">Total Adventures</p>
                                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                    {carBookings.length + tourBookings.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}