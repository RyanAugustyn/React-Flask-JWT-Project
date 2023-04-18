import React from "react";
import BookCard from "../BookPresenter/BookCard";
import "./BookMapper.css";

const BookMapper = ({ books }) => {
  return (
    <div className="books_map">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookMapper;
