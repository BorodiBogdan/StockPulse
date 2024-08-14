'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface StockData {
  setStockData: any;
}

const StockInfo: React.FC<StockData> = ({ setStockData }: StockData) => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/getStockInfo?symbol=${symbol}`);
      setStockData(response.data);
    } catch (error) {
      setError('Failed to fetch stock information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className='text-xl font-bold text-white'>Get Stock Information</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol"
        className='border border-gray-600 rounded-md p-2 text-black w-full'
      />
      <button className={`bg-blue-500 p-2 rounded-xl text-white w-full ${loading && 'opacity-50 cursor-not-allowed'}`} onClick={fetchStockInfo} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Stock Info'}
      </button>

      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
};

export default StockInfo;
