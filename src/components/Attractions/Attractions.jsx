import React, { useEffect, useState } from 'react';

function Attractions(props) {
  // const [attractions, setAttractions] = useState([]);

  console.log(props.attraction)

  // useEffect( () => {
  //   setAttractions(props.attraction)
  // }, [props.attraction]);

  return (
    <>
      <h1>Testing</h1>

      <div>
        {props.attraction.map(place => {
          return <p>Name: {place.name}, Rating: {place.rating}, Types: {place.types.map(type => type)}</p>
        })}
      </div>
    </>
  );
}

export default Attractions;
