import React, { useEffect, useState } from 'react';
import Modal from '../Modal/modalTest';
/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const [attractions, setAttractions] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const things = <p>Hello, from the other side.</p>;

  console.log(props)
  

  useEffect( () => {
    setAttractions(props.attraction)
  }, [props.attraction]);

  const fetch = () => {
    console.log("P CLICKED")
    setLoaded(true)
  };

  return (
    <>
      <h1>Testing Attractions</h1>

      <div>
        {attractions && attractions.map(place => {
          return <p 
          onClick={fetch} 
          key={place.placeId}>Name: {place.name}, Rating: {place.rating}, Types: {place.types.map(type => `${type}  `)}</p>
        })}
      </div>
     {loaded && <Modal data={things} />}

      
    </>
  );
}

export default Attractions;
