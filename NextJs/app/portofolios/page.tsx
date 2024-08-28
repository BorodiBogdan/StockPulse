import React from 'react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

// Fetching the latest shared portfolios from the API
export default async function LatestPortfoliosPage() {
    // Fetch the shared portfolios from the API
    revalidatePath('/api/sharedportofolios');

    const response = await fetch('http://localhost:3000/api/sharedportofolios').then((res) => res.json());
    console.log(response);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-x-hidden pt-28">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Latest Shared Portfolios</h1>

                <PortfoliosGrid portfolios={response} />
            </div>
        </div>
    );
}

interface Portfolio {
    id: string
    user: string;
    stock: {
        id: string;
        symbol: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
    createdAt: string;
    comments: string[];
}

const PortfoliosGrid: React.FC<{ portfolios: Portfolio[] }> = ({ portfolios }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio, index) => (
                <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative"
                >
                    {/* Access the `username` field from the `user` object */}
                    <h2 className="text-2xl font-bold text-blue-400 mb-2">{portfolio.user}'s Portfolio</h2>
                    <p className="text-gray-400 text-sm mb-4">Shared on: {new Date(portfolio.createdAt).toLocaleDateString()}</p>

                    <div className="space-y-2 pb-20">
                        <h3 className="text-lg text-white mb-2">Stocks:</h3>
                        {portfolio.stock.length > 0 ? (
                            portfolio.stock.map((stock, idx) => (
                                <p key={idx} className="text-gray-300">
                                    {stock.name} ({stock.symbol})
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-300">No stocks shared.</p>
                        )}
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className="absolute h-20 bottom-0 w-full p-4">
                            {/* Button to view the full portfolio */}
                            <Link href={`/portofolios/${portfolio.id}`}>
                                <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    View Portfolio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {portfolios.length === 0 && (
                <div className="text-center">
                    <p className="text-gray-300 text-lg">No portfolios have been shared yet.</p>
                </div>
            )}
        </div>
    );
};
