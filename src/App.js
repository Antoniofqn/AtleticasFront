import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Home from './pages/Home'; // Import Home as a page

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-red-800">
          <h1>Welcome to Atletica App</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
