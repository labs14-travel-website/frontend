import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import CardDisplay from '../CardDisplay';

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

  const showModal = () => {
    setLoaded(!loaded);
    // this.setState({
    //   show: !this.state.show
    // });
  };
  

  return (
    <>
      <h1>Testing Attractions</h1>

      <div>
        {attractions && attractions.map(place => {
          return <CardDisplay key={place.placeId} handleOnClick={handleOnClick} data={{
            title: place.name,
            body: [
              <h1>Test</h1>,
              <p>two</p>,
              <p>three</p>,
            ],
          }} />
        })} 
      </div>
     {loaded && <Modal data={attractions} onClose={showModal} show={loaded} />}      
    </>
  );
}

export default Attractions;
