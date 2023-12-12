import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ClubShow from './components/ClubShow';
import Navbar from './components/Navbar';
import ClubIndex from './components/ClubIndex';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/clubs/:clubHashid" element={<ClubShow />} />
            <Route path="/clubs" element={<ClubIndex/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
