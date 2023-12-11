import React from 'react';
import UniversitiesList from './UniversitiesList';

const Home = () => {
  return (
    <div>
      <header className="bg-white border-b border-gray-200 py-4 mb-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-800">Atléticas App</h1>
        </div>
      </header>
      <UniversitiesList />
    </div>
  );
};

export default Home;
