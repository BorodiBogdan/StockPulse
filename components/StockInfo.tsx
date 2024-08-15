'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockCard from './StockCard';
import { saveStock } from '../actions/actions';

const defaultStock = {
  timestamp: 0,
  code: 'AAPL',
  open: 150.00,
  high: 155.00,
  low: 149.50,
  close: 152.30,
  volume: 89000000,
  previousClose: 151.50,
  change: 0.80,
  change_p: 0.53,
};


export default function StockInfo({ session, username }: { session: any, username: string | null }) {
  const [stockData, setStockData] = useState<any>(defaultStock); // Default stock data
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedStock, setSavedStock] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveStock = async () => {
    setError(null); // Clear previous errors

    try {
      await saveStock(symbol, username);
      setSaveError(null);
    } catch (err: any) {
      // Catch and handle any error from the server-side
      setSaveError(err.message);
    }
  };

  // Fetch stock data when user clicks search
  const fetchStockInfo = async () => {
    if (!symbol) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/getStockInfo?symbol=${symbol}`);
      console.log(response.data);

      if (response.data.change != 'NA')
        setStockData(response.data);
      else throw new Error('Stock not found');
    } catch (error) {
      setError('Failed to fetch stock information');
    } finally {
      setLoading(false);
    }
  };

  // Save the current stock to local storage

  // Load saved stock from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedStock');
    if (saved) {
      setStockData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="bg-gradient-to-br h-full from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 pt-24">
      <p className='pb-10 text-3xl font-bold text-center p-2'>Search for stocks all over the world!!</p>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Search Bar */}
        <div className="flex flex-col justify-center items-start space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">Stock Information</h2>
          <p className="text-gray-300 mb-4">Enter a stock symbol to get real-time information.</p>

          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol"
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={fetchStockInfo}
            disabled={loading}
            className={`w-full p-3 rounded-md bg-blue-500 text-white font-semibold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {loading ? 'Fetching...' : 'Search'}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {stockData && session && (
            <button
              onClick={() => handleSaveStock()}
              className="w-full p-3 mt-4 rounded-md bg-green-500 text-white font-semibold transition-all hover:bg-green-600"
            >
              Save Stock
            </button>
          )}

          {savedStock && (
            <p className="text-green-400 mt-4">Saved Stock: {savedStock}</p>
          )}
          {
            saveError &&
            <p className="text-red-500 mt-4">{saveError}</p>
          }
        </div>

        {/* Right Side - Stock Data */}
        <div className="flex flex-col justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">{stockData?.code || 'Default Stock'}</h3>

          <div className="w-full">
            {stockData ? (
              <StockCard {...stockData} />
            ) : (
              <div className="text-gray-400 text-center">
                <p>Loading stock data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
