import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./AddReview.css";

const AddReview = ({ book_id, thumnail_url, title, getReviews }) => {
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [user, token] = useAuth();
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);

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

        setReviewSubmitted(true);
        getReviews();
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
      setFavoriteAdded(true);
    } catch {}
  }

  return (
    <div className="add_review_container">
      <h3 className="add_review_header">Add Your Review</h3>
      <form className="add_review_form" onSubmit={handleSubmit}>
        <div className="radio_button_group" id="radio_button_group">
          <label>
            <input
              disabled={!reviewSubmitted}
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
              disabled={!reviewSubmitted}
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
              disabled={!reviewSubmitted}
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
              disabled={!reviewSubmitted}
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
              disabled={!reviewSubmitted}
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
          disabled={!reviewSubmitted}
          id="review_text"
          value={ratingText}
          rows="5"
          onChange={(event) => setRatingText(event.target.value)}
        ></textarea>
        <div className="submit_button_container">
          <button
            className="submit_review_btn"
            disabled={!reviewSubmitted}
            id="submit_new_review"
          >
            Submit Review
          </button>
        </div>
      </form>
      <button
        onClick={addToFavories}
        disabled={!favoriteAdded}
        className="add_favorite_btn"
        id="add_favorite"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default AddReview;
