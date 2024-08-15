import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Page() {
    const session = await getServerSession(options);

    // Redirect the user to the login page if they are not logged in
    if (!session?.user?.name) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    // Fetch all the stocks the user has saved
    const response = await fetch(`http://localhost:3000/api/stocks?username=${session.user.name}`).then((res) =>
        res.json()
    );

    return (
        <StocksManager stocks={response} />
    );
}

interface Stock {
    name: string;
    symbol: string;
}

interface StocksManagerProps {
    stocks: Stock[];
}

const StocksManager: React.FC<StocksManagerProps> = ({ stocks }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Your Saved Stocks</h1>

                {stocks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <button
                                        className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete Stock
                                    </button>
                                </div>
                            </div>
                        ))}
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