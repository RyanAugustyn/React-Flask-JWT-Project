import React from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetails/BookDetails";
import DisplayReveiws from "../../components/DisplayReviews/DisplayReviews";

const DetailsPage = () => {
  const { bookID } = useParams();
  return (
    <>
      <div id="display_part">
        <BookDetails bookID={bookID} />
      </div>
      <div id="right_side">
        <div id="add_review"></div>
        <div id="reviews">
          <DisplayReveiws book_id={bookID} />
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
