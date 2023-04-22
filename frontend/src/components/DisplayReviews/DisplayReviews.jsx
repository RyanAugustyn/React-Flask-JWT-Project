import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import star from "../../images/star.png";
import "./DisplayReviews.css";

const DisplayReviews = ({ book_id, reviews, averageRating }) => {
  function starLoop(count) {
    let total = [];
    for (let i = 0; i < count; i++) {
      total.push(<img key={i} src={star} alt="star" />);
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
