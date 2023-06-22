import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setIsLoggedIn, setRoute }) => {
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
        console.log('Login successful');
        setIsLoggedIn(true);
        setRoute('home');
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
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
          onKeyPress={handleKeyPress} 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button type="submit">Login</button>
      </form>
      <h5>IF YOU ARE A NEW USER, PLEASE SIGNUP</h5>
    </div>
  );
};

export default Login;
