import React from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetails/BookDetails";
import DisplayReveiws from "../../components/DisplayReviews/DisplayReviews";
import AddReview from "../../components/AddReview/AddReview";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { bookID } = useParams();
  return (
    <div className="page_container">
      <div className="display_part">
        <BookDetails bookID={bookID} />
      </div>
      <div className="right_side">
        <div className="add_review">
          <AddReview book_id={bookID} />
        </div>
        <div className="reviews">
          <DisplayReveiws book_id={bookID} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
