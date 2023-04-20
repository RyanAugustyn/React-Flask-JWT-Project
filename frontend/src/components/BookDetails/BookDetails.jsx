import React, { useState, useEffect } from "react";
import { createBook } from "../../utils/BookHelper";
import axios from "axios";
import parse from "html-react-parser";
import "./BookDetails.css";

const BookDetails = ({ bookID }) => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        let response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookID}?key=AIzaSyCvXz_dgisc4ShRelIp9BYV486C7wNPETQ`
        );

        let book = createBook(response.data);
        setBook(book);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBook();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="details_container">
          <div className="image_container">
            <img className="book_image" src={book.image} />
          </div>
          <div className="above_description_container">
            <h2 className="book_title">{book.title}</h2>
            <div className="below_title_container">
              <div className="pages">
                {book.pageCount && (
                  <p className="pages_text">{book.pageCount} pages</p>
                )}
              </div>
              <div className="subtitle">
                {book.subTitle ? (
                  <h3>{book.subTitle}</h3>
                ) : (
                  <h3>Sub goes here</h3>
                )}
              </div>
              <div className="price">
                {book.priceAmount ? (
                  <p className="price_detail">
                    {book.priceCurrency}
                    {book.priceAmount}
                  </p>
                ) : (
                  <p className="price_detail">Not for Sale</p>
                )}
              </div>
            </div>
            <div className="author_container">
              {book.author_count > 0 && (
                <p className="author_text">
                  {book.author_count === 1 ? "Author" : "Authors"}:{" "}
                  {book.author}
                </p>
              )}
            </div>
          </div>
          <div className="descritpiton_container">
            {book.description.includes("<p") ? (
              parse(book.description)
            ) : (
              <p>{book.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
