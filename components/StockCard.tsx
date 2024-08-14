import React from 'react';

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

const StockCard: React.FC<StockData> = ({ code, open, high, low, close, volume, previousClose, change, change_p }) => {
    return (
        <div className="bg-gradient-to-br from-gray-800 to-black shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 p-8">
            <div className="text-white">
                <div className="font-extrabold text-4xl mb-4">{code}</div>
                <div className="text-gray-400 text-sm mb-6">Real-time Stock Data</div>
                <div className="space-y-4">
                    <p><span className="font-bold">Open:</span> ${open.toFixed(2)}</p>
                    <p><span className="font-bold">High:</span> ${high.toFixed(2)}</p>
                    <p><span className="font-bold">Low:</span> ${low.toFixed(2)}</p>
                    <p><span className="font-bold">Close:</span> ${close.toFixed(2)}</p>
                    <p><span className="font-bold">Previous Close:</span> ${previousClose.toFixed(2)}</p>
                    <p><span className="font-bold">Change:</span> ${change.toFixed(2)}</p>
                    <p className={`font-extrabold text-2xl ${change_p >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {change_p >= 0 ? '▲' : '▼'} {change_p.toFixed(2)}%
                    </p>
                </div>
                <div className="text-lg text-gray-400 mt-6">Volume: {volume.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default StockCard;
