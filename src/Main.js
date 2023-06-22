import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DogList from './DogList';
import './App.css';

const Main = () => {
  const [dogs, setDogs] = useState([]);
  const [counter, setCounter] = useState(1);
  const [route, setRoute] = useState('main');
  const location = useLocation();
  const sessionToken = location.state?.sessionToken;

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

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/logout', {
        session_token: sessionToken,
      });
      console.log(response.data.message);
      setCounter(1);
      setRoute('login'); // Set the route to 'login' after successful logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="body">
        <h1 className="title">WELCOME TO THE WORLD OF DOGS</h1>
        <div className="counter">
          <button className="counter-btn" onClick={decrement}>
            -
          </button>
          <span className="counter-value">{counter}</span>
          <button className="counter-btn" onClick={increment}>
            +
          </button>
        </div>
        <div className="image-layout">
          <DogList dogs={dogs} />
        </div>
      </div>
    </div>
  );
};

export default Main;

