import React, { useState, useEffect } from "react";
import { createBook } from "../../utils/BookHelper";
import axios from "axios";
import parse from "html-react-parser";

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
        <div>
          <img src={book.image} />
          <div>
            <div>{book.pageCount && <p>{book.pageCount} pages</p>}</div>
            <div>
              <h2>{book.title}</h2>
              {book.subTitle && <h3>{book.subTitle}</h3>}
            </div>
            <div>
              {book.priceAmount ? (
                <p>
                  {book.priceCurrency}
                  {book.priceAmount}
                </p>
              ) : (
                <p>Not for Sale</p>
              )}
            </div>
          </div>
          <div>
            {book.author_count > 0 && (
              <p>
                {book.author_count === 1 ? "Author" : "Authors"}: {book.author}
              </p>
            )}
          </div>
          <div>
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
