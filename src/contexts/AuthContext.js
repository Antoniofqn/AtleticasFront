import React, { createContext, useState, useEffect } from 'react';
import { validateToken, logout as logoutService } from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('access-token');
      if (token) {
        const isValid = await validateToken(token); // Validate the token
        setIsLoggedIn(isValid);
        if (!isValid) {
          logoutService(); // Clear tokens and reset state if token is invalid
        }
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
