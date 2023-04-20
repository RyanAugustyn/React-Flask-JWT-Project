import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./AddReview.css";

const AddReview = ({ book_id, thumnail_url, title }) => {
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [user, token] = useAuth();

  function ratingChange(event) {
    setRating(parseInt(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (ratingText !== "" && rating !== 0) {
      let book_review = {
        book_id: book_id,
        text: ratingText,
        rating: rating,
      };
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
  }

  async function addToFavories(event) {
    event.preventDefault();
    let favorite = {
      book_id: book_id,
      title: title,
      thumbnail_url: thumnail_url,
    };
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/user_favorites",
        favorite,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      document.getElementById("add_favorite").disabled = true;
    } catch {}
  }

  return (
    <div className="add_review_container">
      <h3 className="add_review_header">Add Your Review</h3>
      <form className="add_review_form" onSubmit={handleSubmit}>
        <div className="radio_button_group" id="radio_button_group">
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
          rows="5"
          onChange={(event) => setRatingText(event.target.value)}
        ></textarea>
        <div className="submit_button_container">
          <button className="submit_review_btn" id="submit_new_review">
            Submit Review
          </button>
        </div>
      </form>
      <button
        onClick={addToFavories}
        className="add_favorite_btn"
        id="add_favorite"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default AddReview;
