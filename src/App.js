import React, { useState, useEffect } from "react";
import DogList from "./DogList";
import './App.css';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [counter, setCounter] = useState(4);

  const fetchDogImages = () => {
    fetch(`https://dog.ceo/api/breeds/image/random/${counter}`)
    .then((res) => res.json())
    .then((data) => {
      setDogs(data.message);
    });
  };

  useEffect(() => {
    fetchDogImages();
  }, [counter]);

  const increment = () =>{
    setCounter(counter + 1);
  };

  const decrement = () => {
    if(counter > 1) {
      setCounter(counter - 1);
    }
  };

  return(
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
    </div>
  );
};

export default App;


/* //Using the React Lifecycle method

import React, { Component } from 'react';
import DogList from './DogList';
import './App.css';


//Basically here "App" component is defined as a class that extends the class from react
// It has a constructor that initializes the component state with an empty array of 'dogs'.
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      dogs: []
    }
  }
//This lifecycle is invoked automatically after component is mounted
  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random/5") //fetch request is made to the given url where it returns a response
    .then((res) => res.json()) //the response is converted to Json using 'res.json()'
    .then((data) => { //here 'data' object containing the dog images are extracted
      this.setState({dogs: data.message}) //this is called to update the component 'dogs' state with fetched data
    })
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Welcome to dog world</h1>
        <DogList dogs={this.state.dogs} />
      </div>
    );
  }
}

export default App; */
