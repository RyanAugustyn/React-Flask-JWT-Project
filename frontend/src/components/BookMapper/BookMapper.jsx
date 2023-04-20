import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BookMapper.css";

const BookMapper = ({ books }) => {
  if (books === undefined) {
    books = [];
  }

  return (
    <div className="books_map">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookMapper;
