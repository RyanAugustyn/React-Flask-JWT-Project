import React from "react";

const BookPresenter = ({ book }) => {
  return (
    <div>
      <div>
        <img src="book.image" alt="picture of book" />
      </div>
      <div>
        <h3>{book.title}</h3>
      </div>
      <div>
        <p>{book.pageCount}</p>
        <p>{book.subTitle}</p>
        <div>
          <p>{book.priceCurrency}</p>
          <p>{book.priceAmount}</p>
        </div>
      </div>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookPresenter;
