import React, { useState, useEffect } from "react";
import BookMapper from "../../components/BookMapper/BookMapper";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./FavoritesPage.css";

const FavoritesPage = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [user, token] = useAuth();

  //get list of favorites by logged in user

  useEffect(() => {
    const getFavorites = async () => {
      console.log(token);
      try {
        let response = await axios.get(
          "http://127.0.0.1:5000/api/user_favorites",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getFavorites();
  }, [token]);

  return (
    <div className="container">
      <h1>List of Favorites for {user.username}!</h1>
      {favorites ? (
        <h2>"No Favorites Yet!"</h2>
      ) : (
        <BookMapper books={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;
