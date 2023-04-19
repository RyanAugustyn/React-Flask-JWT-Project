import React from "react";
import { useState } from "react";
import axios from "axios";
import BookMapper from "../../components/BookMapper/BookMapper";
import { createBook } from "../../utils/BookHelper";

const SearchPage = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      debugger;
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
      <p>Search page</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchBar"
          value={searchBarText}
          onChange={(event) => {
            setSearchBarText(event.target.value);
          }}
        ></input>
        <label htmlFor="searchBar">Search</label>
        <button>Search</button>
      </form>
      <BookMapper books={books} />
    </div>
  );
};

export default SearchPage;
