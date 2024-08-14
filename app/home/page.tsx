'use client';
import React from 'react';
import StockInfo from '../../components/StockInfo';
import StockCard from '../../components/StockCard';

const Page = () => {
    const [stockData, setStockData] = React.useState<any>(null);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex items-center justify-center'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-4xl md:text-6xl font-extrabold text-center mb-10'>
                        Discover Top Performing Stocks
                    </h1>
                    <div className='w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg'>
                        <StockInfo setStockData={setStockData} />
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <h3 className='text-2xl font-bold mb-6'>
                        Stock Data:
                    </h3>

                    <div className='w-full'>
                        {stockData ? (
                            <StockCard {...stockData} />
                        ) : (
                            <div className='bg-gray-700 p-6 rounded-lg shadow-md'>
                                <StockCard timestamp={0} code={"YOUR_STOCK"} open={0} high={0} low={0} close={0} volume={0} previousClose={0} change={0} change_p={0} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
