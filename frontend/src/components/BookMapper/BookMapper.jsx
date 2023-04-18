import React from "react";
import BookPresenter from "../BookPresenter/BookPresenter";
book;

const BookMapper = ({ books }) => {
  const book = {
    image: "",
    title: "",
    pageCount: 0,
    subTitle: "",
    priceCurrency: "",
    priceAmount: 0,
    author: "",
    description: "",
  };

  return (
    <div>
      {books.map((book) => (
        <BookPresenter key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookMapper;
