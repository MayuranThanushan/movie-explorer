import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "68b0765a6d5c51653ecdd4bda511cc24";

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
