import React, { useEffect, useState } from 'react';

/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const [attractions, setAttractions] = useState([]);

  console.log(props)

  useEffect( () => {
    setAttractions(props.attraction)
  }, [props.attraction]);

  return (
    <>
      <h1>Testing</h1>

      <div>
        {attractions && attractions.map(place => {
          return <p key={place.placeId}>Name: {place.name}, Rating: {place.rating}, Types: {place.types.map(type => type)}</p>
        })}
      </div>
    </>
  );
}

export default Attractions;
