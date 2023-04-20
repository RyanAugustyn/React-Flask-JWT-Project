import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BookMapper.css";
import { Link } from "react-router-dom";

const BookMapper = ({ books }) => {
  if (books === undefined) {
    books = [];
  }

  return (
    <div className="books_map">
      {books.map((book, index) => (
        <Link className="card_link" key={index} to={`/details/${book.id}`}>
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookMapper;
