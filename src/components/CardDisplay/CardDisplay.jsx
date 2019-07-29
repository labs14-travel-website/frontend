import React, { Suspense } from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

export const CardDisplay = (props) => {
  return (
    <div className="container">
      
      <Suspense
        fallback={
          <Loader type="Ball-Triangle" color="#00BFFF" height="90" width="60" />
        }
      >
        <h2>{props.location}</h2>
      </Suspense>
    </div>
  );
};

 CardDisplay.propTypes = {
    location: PropTypes.string
};

export default CardDisplay;
