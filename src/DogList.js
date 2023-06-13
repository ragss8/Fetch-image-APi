import React from "react";
import Dog from './Dog'
import './Doglist.css';

const DogsList = (props) => {  //here it accepts props as it's parameter
    const dogsArray = props.dogs.map((dogsURL) => {
        return <Dog url = {dogsURL} />
    })

return(
    <div className="container">
        {dogsArray}
    </div>
)
}

export default DogsList;