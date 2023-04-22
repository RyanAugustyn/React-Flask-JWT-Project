import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetails/BookDetails";
import DisplayReveiws from "../../components/DisplayReviews/DisplayReviews";
import AddReview from "../../components/AddReview/AddReview";
import axios from "axios";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { bookID } = useParams();
  const [bookTitle, setBookTitle] = useState("");
  const [bookImageURL, setBookImageURL] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/book/${bookID}`
      );
      console.log(response.data);
      setReviews(response.data.reviews);
      setAverageRating(response.data["average rating"]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="page_container">
      <div className="display_part">
        <BookDetails
          bookID={bookID}
          setBookTitle={setBookTitle}
          setBookImageURL={setBookImageURL}
        />
      </div>
      <div className="right_side">
        <div className="add_review">
          <div className="center_add_review">
            <AddReview
              book_id={bookID}
              title={bookTitle}
              thumnail_url={bookImageURL}
              getReviews={getReviews}
            />
          </div>
        </div>
        <div className="reviews">
          <DisplayReveiws
            book_id={bookID}
            reviews={reviews}
            averageRating={averageRating}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
