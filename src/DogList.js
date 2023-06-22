import React from "react";
import Dog from './Dog';
import './DogList.css';

const DogList = (props) => {
  const dogsArray = props.dogs.map((dogsURL, index) => {
    return <Dog key={index} url={dogsURL} />;
  });

  return (
    <div className="container">
      {dogsArray}
    </div>
  );
};

export default DogList;
