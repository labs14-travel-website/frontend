import React from "react";
import StarRatingComponent from "react-star-rating-component";

const Ratings = props => {

      return (                
        <>
          <StarRatingComponent 
            name={"rating"} 
            starCount={5}
            value={2.5}
            renderStarIcon={() => <span><i className="fas fa-star"></i></span>}
            renderStarIconHalf= {() => <span style= {{color: "#FFB400"}}><i className="fas fa-star-half-alt"></i></span>}
            // emptyStarColor= "#FFB400"
          />
        </>
      );
}

  
export default Ratings;
