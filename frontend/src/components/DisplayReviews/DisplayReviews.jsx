import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import star from "../../images/star.png";
import "./DisplayReviews.css";

const DisplayReviews = ({ book_id }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/book/${book_id}`
      );
      console.log(response.data);
      setReviews(response.data.reviews);
      setAverageRating(response.data["average rating"]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function starLoop(count) {
    let total = [];
    for (let i = 0; i < count; i++) {
      total.push(<img src={star} alt="star" />);
    }
    return total;
  }

  return (
    <div>
      <div className="reviewHeading">
        <p>USER REVIEWS</p>
        <p>Average Rating: {averageRating}</p>
      </div>

      {reviews.map((review, index) => {
        return (
          <div key={index} className="reviewCard">
            <div className="reviewText">{review.text}</div>
            <div className="bottomReview">
              <div className="userName">{review.user.first_name}</div>

              <div className="stars">{starLoop(review.rating)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayReviews;
