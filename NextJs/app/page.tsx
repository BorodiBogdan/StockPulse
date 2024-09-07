import React from 'react';
import Hero from '../components/Hero';
import { FeaturesOverview } from '../components/FeaturesOverview';
import LatestStocks from '../components/LatestStocks';
import StockInfo from '../components/StockInfo';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

export default async function Page() {
  const session = await getServerSession(options);
  const username = session?.user?.name || null;
  const stocks: any = [];

  // Use fetch instead of axios
  const response = await fetch(process.env.NEXTAUTH_URL + `/api/allstocks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    stocks.push(data);
  } else {
    console.error('Failed to fetch stocks');
  }

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <LatestStocks />
      <StockInfo session={session} username={username} stocks={stocks} />
      <FeaturesOverview />
    </main>
  );
}

