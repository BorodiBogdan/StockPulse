import React from 'react';
import Hero from '../components/Hero';
import { FeaturesOverview } from '../components/FeaturesOverview';

const Home: React.FC = () => {

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <FeaturesOverview />
    </main>
  );
}

export default Home;
