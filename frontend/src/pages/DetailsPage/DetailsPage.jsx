import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetails/BookDetails";
import DisplayReveiws from "../../components/DisplayReviews/DisplayReviews";
import AddReview from "../../components/AddReview/AddReview";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { bookID } = useParams();
  const [bookTitle, setBookTitle] = useState("");
  const [bookImageURL, setBookImageURL] = useState("");
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
            />
          </div>
        </div>
        <div className="reviews">
          <DisplayReveiws book_id={bookID} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
