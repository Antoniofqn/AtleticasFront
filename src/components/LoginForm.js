import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const success = await login(email, password);
    if (success) {
      setIsLoggedIn(true);
    } else {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
