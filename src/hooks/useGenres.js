import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.error("Genre fetch error", err));
  }, []);

  return genres;
};
