import React, { useState, useEffect } from "react";
import BookMapper from "../../components/BookMapper/BookMapper";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./FavoritesPage.css";

const FavoritesPage = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [user, token] = useAuth();

  function formatFavorite(object) {
    let book = {
      id: object.book_id,
      image: object.thumbnail_url,
      title: object.title,
      favorite_id: object.id,
    };
    return book;
  }
  //get list of favorites by logged in user

  const getFavorites = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:5000/api/user_favorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let formatedFavorites = response.data.map((unformated) =>
        formatFavorite(unformated)
      );
      setFavorites(formatedFavorites);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [token]);

  async function deleteFromFavorites(book_id) {
    try {
      let temptoken = token;
      debugger;
      let response = await axios.delete(
        `http://127.0.0.1:5000/api/user_favorites/${book_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {}
    getFavorites();
  }

  return (
    <div>
      <h1 className="title_top">List of Favorites for {user.username}!</h1>
      {favorites != [] ? (
        <BookMapper
          books={favorites}
          includeDeleteButton={true}
          deleteFromFavorites={deleteFromFavorites}
        />
      ) : (
        <h2>"No Favorites Yet!"</h2>
      )}
    </div>
  );
};

export default FavoritesPage;
