import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Send sign-up request to the server or API using Axios
      const response = await axios.post('/api/signup', { username, password });

      // Check the response status
      if (response.status === 200) {
        // Sign-up successful
        alert('Sign up successful!');
      } else {
        // Sign-up failed
        alert('Sign up failed!');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <body>
      <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </body>
  );
};

export default SignUp;
