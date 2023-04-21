import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BookMapper.css";
import { Link } from "react-router-dom";

const BookMapper = ({ books, includeDeleteButton, deleteFromFavorites }) => {
  if (books === undefined) {
    books = [];
  }

  return (
    <div className="books_map">
      {books.map((book, index) => (
        // <Link className="card_link" key={index} to={`/details/${book.id}`}>
        <BookCard
          key={index}
          book={book}
          includeDeleteButton={includeDeleteButton}
          deleteFromFavorites={deleteFromFavorites}
        />
        // </Link>
      ))}
    </div>
  );
};

export default BookMapper;
