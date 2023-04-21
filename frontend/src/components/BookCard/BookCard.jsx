import React from "react";
import "./BookCard.css";
import image from "../../images/nocover.png";
import { Link } from "react-router-dom";

const BookCard = ({ book, includeDeleteButton, deleteFromFavorites }) => {
  function deleteButtonClicked(event) {
    let id = book.favorite_id;
    deleteFromFavorites(id);
  }

  return (
    <div className="card book_card">
      <Link className="card_link" to={`/details/${book.id}`}>
        {book.image ? (
          <img
            className="card-img-top card_img"
            src={book.image}
            alt="picture of book"
          />
        ) : (
          <img
            className="card-img-top card_img"
            src={image}
            alt="No cover image"
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.subTitle}</p>
        </div>
      </Link>
      {includeDeleteButton && (
        <button
          className="delete-favorite-button"
          value={book.book_id}
          onClick={deleteButtonClicked}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BookCard;
