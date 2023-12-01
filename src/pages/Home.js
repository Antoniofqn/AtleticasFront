import React from 'react';
import UniversitiesList from '../components/UniversitiesList';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem vindo ao App Atléticas</h1>
      <UniversitiesList />
    </div>
  );
};

export default Home;
