import React, { useState } from 'react';
import axios from 'axios';
import App from './App';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [route, setRoute] = useState('login');
  const [sessionToken, setSessionToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const receivedSessionToken = response.data.session_token;
        setSessionToken(receivedSessionToken);
        setLoggedIn(true);
      } else {
        console.log('Login failed:', response.data.message);
      }
      setRoute('App');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const renderComponent = () => {
    switch (route) {
      case 'login':
        return (
          <div className="container login"> {/* Added "login" class name */}
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
              <h4>IF A NEW USER, PLEASE SIGNUP</h4>
            </p>
          </div>
        );
      case 'App':
        return <App />;
      default:
        return null;
    }
  };

  return renderComponent();
};

export default Login;
