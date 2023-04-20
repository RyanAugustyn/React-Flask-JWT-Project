import React from "react";
import { useState } from "react";
import axios from "axios";
import BookMapper from "../../components/BookMapper/BookMapper";
import { createBook } from "../../utils/BookHelper";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchBarText}&startIndex=0&maxResults=40&printType=books&key=AIzaSyCvXz_dgisc4ShRelIp9BYV486C7wNPETQ`
      );
      let books = response.data.items;
      books = books.map((book) => {
        let createdbook = createBook(book);
        return createdbook;
      });
      setBooks(books);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className="search_bar_conainer">
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              className="form-control search_bar"
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Search"
              value={searchBarText}
              onChange={(event) => {
                setSearchBarText(event.target.value);
              }}
            />
            <label htmlFor="searchBar"></label>
          </div>
          <button className="btn btn-primary search_button">Search</button>
        </form>
      </div>
      <BookMapper books={books} />
    </div>
  );
};

export default SearchPage;
