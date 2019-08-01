import React, { useEffect, useState } from 'react';
import Modal from '../Modal/modalTest';
/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const { attractions } = props;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const things = <p>Hello, from the other side.</p>;

  console.log(props)

  const handleOnClick = () => {
    console.log("P CLICKED")
    setLoaded(true)
  };

  return (
    <>
      <h1>Testing Attractions</h1>

      <div>
        {attractions && attractions.map(place => {
          return <p
          onClick={handleOnClick} 
          key={place.placeId}>Name: {place.name}, Rating: {place.rating}, Types: {place.types.map(type => `${type}  `)}</p>
        })}
      </div>
     {loaded && <Modal data={things} />}      
    </>
  );
}

export default Attractions;
