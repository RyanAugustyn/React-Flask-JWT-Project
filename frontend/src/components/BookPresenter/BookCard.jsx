import React from "react";
import "./BookCard.css";
import image from "../../images/nocover.png";

const BookCard = ({ book }) => {
  return (
    <div className="card book_card">
      {book.image ? (
        <img
          className="card-img-top card_img"
          src={book.image}
          alt="picture of book"
        />
      ) : (
        <img className="card-img-top" src={image} alt="No cover image" />
      )}
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.subTitle}</p>
      </div>
    </div>
  );
};

export default BookCard;
