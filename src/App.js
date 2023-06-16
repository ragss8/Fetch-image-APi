import React, { useState, useEffect, useCallback } from "react";
import SignUp from './Signup';
import Login from './Login';
import DogList from './Doglist';
import './App.css';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [counter, setCounter] = useState(1);
  const [route, setRoute] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const fetchDogImages = useCallback(() => {
    fetch(`https://dog.ceo/api/breeds/image/random/${counter}`)
      .then((res) => res.json())
      .then((data) => {
        setDogs(data.message);
      });
  }, [counter]);

  useEffect(() => {
    fetchDogImages();
  }, [fetchDogImages]);

  useEffect(() => {
    // Retrieve the session token from localStorage on component mount
    const storedSessionToken = localStorage.getItem('sessionToken');
    if (storedSessionToken) {
      setSessionToken(storedSessionToken);
    }
  }, []);

  function increment() {
    if (route === 'login') {
      setCounter(counter + 1);
    } else {
      setCounter(counter);
      alert('Log in to generate more such images');
      setRoute('login');
    }
  }  

  function decrement() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  const handleLogin = (token) => {
    setSessionToken(token);
    localStorage.setItem('sessionToken', token);
    setRoute('home');
  };

  const handleLogout = () => {
    setSessionToken('');
    localStorage.removeItem('sessionToken');
    setRoute('login');
  };

  const renderContent = () => {
    switch (route) {
      case 'home':
        return (
          <div className="body">
            <h1 className="title">WELCOME TO THE WORLD OF DOGS</h1>
            <div className="counter">
              <button className="counter-btn" onClick={decrement}>-</button>
              <span className="counter-value">{counter}</span>
              <button className="counter-btn" onClick={increment}>+</button>
            </div>
            <div className="image-layout">
              <DogList dogs={dogs} />
            </div>
            {sessionToken && (
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            )}
          </div>
        );
      case 'signup':
        return <SignUp />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <button className="nav-btn" onClick={() => setRoute('home')}>Home</button>
          </li>
          {!sessionToken && (
            <>
              <li>
                <button className="nav-btn" onClick={() => setRoute('signup')}>Sign Up</button>
              </li>
              <li>
                <button className="nav-btn" onClick={() => setRoute('login')}>Login</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {renderContent()}
    </div>
  );
};

export default App;
