import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { green } from "ansi-colors";


const PriceRating = props => {
  console.log(props)
   
    return (                
      <div>
        <StarRatingComponent 
          name="price" 
          editing={false}
          renderStarIcon={() => <span><i className="fas fa-dollar-sign"></i></span>}
          starCount={4}
          value={props.price}
          starColor={"green"}
        />
      </div>
    );
  }

  export default PriceRating;