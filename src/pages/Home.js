import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { Grid, Typography } from "@mui/material";
import tmdb from "../api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await tmdb.get("/search/movie", {
        params: { query },
      });
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {movies.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" mt={4}>
          Search for a movie to see results.
        </Typography>
      )}
    </div>
  );
};

export default Home;
