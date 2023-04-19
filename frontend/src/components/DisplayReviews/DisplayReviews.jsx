import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const DisplayReviews = ({ book }) => {
  const [reviews, setReviews] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const book_id = useParams();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/book/${book_id}`
      );
      setReviews(response.data.reviews);
      setAverageRating(response.data["average rating"]);
      //console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <p>Average Rating: {averageRating}</p>
      {reviews.map((review, index) => {
        <div key={index}>
          <div>{review.text}</div>
          <div>
            {review.user}
            {<img src="../../images/star.png" alt="star" /> * review.rating}
          </div>
        </div>;
      })}
    </div>
  );
};

export default DisplayReviews;
