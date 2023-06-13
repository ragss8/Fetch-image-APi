//Using the React Lifecycle method

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
    fetch("https://dog.ceo/api/breeds/image/random/5")          //fetch request is made to the given url where it returns a response
    .then((res) => res.json())                                  //the response is converted to Json using 'res.json()'
    .then((data) => {                                           //here 'data' object containing the dog images are extracted
      this.setState({dogs: data.message})                       //this is called to update the component 'dogs' state with fetched data
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

export default App;
