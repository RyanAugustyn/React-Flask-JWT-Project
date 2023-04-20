import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddReview = ({ book_id }) => {
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [user, token] = useAuth();

  function ratingChange(event) {
    setRating(parseInt(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let book_review = {
      book_id: book_id,
      text: ratingText,
      rating: rating,
    };
    debugger;
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/user_reviews",
        book_review,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      document.getElementById("submit_new_review").disabled = true;
      document.getElementById("button1").disabled = true;
      document.getElementById("button2").disabled = true;
      document.getElementById("button3").disabled = true;
      document.getElementById("button4").disabled = true;
      document.getElementById("button5").disabled = true;
      document.getElementById("review_text").disabled = true;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div>
      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div id="radio_button_group">
          <label>
            <input
              id="button1"
              type="radio"
              value="1"
              checked={rating === 1}
              onChange={ratingChange}
            />
            1
          </label>
          <label>
            <input
              id="button2"
              type="radio"
              value="2"
              checked={rating === 2}
              onChange={ratingChange}
            />
            2
          </label>
          <label>
            <input
              id="button3"
              type="radio"
              value="3"
              checked={rating === 3}
              onChange={ratingChange}
            />
            3
          </label>
          <label>
            <input
              id="button4"
              type="radio"
              value="4"
              checked={rating === 4}
              onChange={ratingChange}
            />
            4
          </label>
          <label>
            <input
              id="button5"
              type="radio"
              value="5"
              checked={rating === 5}
              onChange={ratingChange}
            />
            5
          </label>
        </div>
        <textarea
          id="review_text"
          value={ratingText}
          onChange={(event) => setRatingText(event.target.value)}
        ></textarea>
        <button id="submit_new_review">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
