import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Filter from './universities/filter';
import './App.css';
import AuthProvider from './contexts/AuthContext';
import LoginForm from './components/LoginForm';

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <Filter />
  </div>
);

const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const App = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Welcome to Atletica App</h1>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
