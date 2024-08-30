// pages/index.tsx

import { revalidatePath } from 'next/cache';
import Link from 'next/link';

// Interface for the stock and watchlist data
interface Stock {
    name: string;
    symbol: string;
}

interface Watchlist {
    user: string;
    stock: Stock[];
    createdAt: string;
    comments: string[];
    id: string;
}

export default async function LandingPage() {
    // Select the latest 3 shared watchlists
    revalidatePath('/api/sharedportofolios');
    const response = await fetch('https://activity-finder-roan.vercel.app/api/sharedportofolios').then((res) => res.json());
    const latestWatchlists: Watchlist[] = response.slice(0, 3);

    return (
        <div className="py-20 md:py-40 bg-gray-900 text-white px-6">
            <div className="container mx-auto">
                {/* Header */}
                <h1 className="text-5xl font-bold text-center text-blue-400 mb-12">Latest 3 Shared Watchlists</h1>

                {/* Latest Shared Watchlists Section */}
                <section className="latest-watchlists bg-gray-800 p-8 rounded-lg shadow-lg">

                    {/* Watchlists Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestWatchlists.map((watchlist) => (
                            <div key={watchlist.id} className="bg-gray-700 p-6 rounded-lg shadow- pb-20 relative">
                                <h3 className="text-2xl font-bold text-white mb-4">{watchlist.user}'s Watchlist</h3>
                                <div className="space-y-2">
                                    {
                                        watchlist.stock.slice(0, Math.min(6, watchlist.stock.length)).map((stock, index) => (
                                            <p key={index} className="text-gray-400">
                                                {stock.name} ({stock.symbol})
                                            </p>
                                        ))
                                    }
                                </div>

                                {/* Link to the detailed watchlist page */}
                                <div className="mt-6 absolute bottom-4">
                                    <Link href={`/portofolios/${watchlist.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                        View Watchlist
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
