import axios from 'axios';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

// This file is a dynamic route that will be rendered at /stocks/:slug
interface StockData {
    code: string;
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    previousClose: number;
    change: number;
    change_p: number;
}


export default async function StockDetails({ params }: { params: { slug: string } }) {
    // Fetch data from the API -> getStockInfo
    const session = await getServerSession();

    if (!session)
        notFound();

    const stock = await fetch(`https://activity-finder-roan.vercel.app/api/getStockInfo?symbol=${params.slug}`).then((res) =>
        res.json()
    );

    // Check if the stock's timestamp is "NA", which indicates the stock was not found
    if (stock.timestamp === "NA")
        notFound();

    // If stock data is valid, return the stock details page
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 flex flex-col items-center justify-center">
            {/* Stock Header */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-400">{params.slug}</h1>
                <p className="text-2xl text-gray-300 mt-2">{stock.code}</p>
            </div>

            {/* Stock Details Grid */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                <div>
                    <p className="text-gray-400">Timestamp</p>
                    <p className="text-2xl font-bold">{stock.timestamp}</p>
                </div>
                <div>
                    <p className="text-gray-400">Open Price</p>
                    <p className="text-2xl font-bold">${stock.open}</p>
                </div>
                <div>
                    <p className="text-gray-400">High</p>
                    <p className="text-2xl font-bold">${stock.high}</p>
                </div>
                <div>
                    <p className="text-gray-400">Low</p>
                    <p className="text-2xl font-bold">${stock.low}</p>
                </div>
                <div>
                    <p className="text-gray-400">Volume</p>
                    <p className="text-2xl font-bold">{stock.volume}</p>
                </div>
                <div>
                    <p className="text-gray-400">Change</p>
                    <p className={`text-2xl font-bold`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.change_p}%)
                    </p>
                </div>
            </div>
        </div>
    );
}
