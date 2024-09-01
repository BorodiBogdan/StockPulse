import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import DeleteStockButton from '../../components/DeleteStockButton';
import ShareWatchlist from '../../components/ShareWatchlist';

export default async function Page() {
    const session = await getServerSession(options);

    if (!session?.user?.name) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    const response = await fetch(process.env.API_CALL_URL + `/api/stocks?username=${session.user.name}`).then((res) =>
        res.json()
    );

    return (
        <StocksManager stocks={response} username={session.user.name} />
    );
}

interface Stock {
    name: string;
    symbol: string;
}

interface StocksManagerProps {
    stocks: Stock[];
    username: string;
}

const StocksManager: React.FC<StocksManagerProps> = ({ stocks, username }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-x-hidden pt-24">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Your Saved Stocks</h1>

                {stocks.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative h-full pb-20">
                            {stocks.map((stock: any) => (
                                <div
                                    key={stock.symbol}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h2 className="text-2xl font-bold text-blue-400">{stock.name}</h2>
                                    <p className="text-lg text-gray-300 mt-2">{stock.symbol}</p>

                                    <div className="mt-4 space-y-2">
                                        <Link href={`./stocks/${stock.symbol}`}>
                                            <button
                                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Get Current Data
                                            </button>
                                        </Link>
                                        <DeleteStockButton symbol={stock.symbol} username={username} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ShareWatchlist username={username} />
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-300 text-lg">You have no saved stocks.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
