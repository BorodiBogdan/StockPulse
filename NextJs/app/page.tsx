import React from 'react';
import Hero from '../components/Hero';
import { FeaturesOverview } from '../components/FeaturesOverview';
import LatestStocks from '../components/LatestStocks';

const Home: React.FC = () => {

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <LatestStocks />
      <FeaturesOverview />
    </main>
  );
}

export default Home;
