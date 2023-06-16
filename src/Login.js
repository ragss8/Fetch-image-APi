import React, { useState } from 'react';
import axios from 'axios';
import App from './App';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const receivedSessionToken = response.data.session_token;
        onLogin(receivedSessionToken); // Notify the parent component about successful login
      } else {
        console.log('Login failed:', response.data.message);
      }
      alert('Login successful');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        <h4>IF YOU ARE A NEW USER, PLEASE SIGNUP</h4>
      </p>
    </div>
  );
};

export default Login;
