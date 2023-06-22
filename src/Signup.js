import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const SignUp = ({ setRoute }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users', { email, password });
      if (response.status === 200) {
        alert('Sign up successful! Please click on Login!!');
        setRoute('login'); // Set the route to 'login' after successful signup
      } else {
        alert('Sign up failed!');
      }
    } catch (error) {
      alert('Error signing up:'+ error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp(e);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress} // Add onKeyPress event listener
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Add onKeyPress event listener
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
