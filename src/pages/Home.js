import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, Divider } from "@mui/material";
import tmdb from "../api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await tmdb.get("/trending/movie/week");
        setTrending(res.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error.message);
      }
    };

    fetchTrending();
  }, []);

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
        <>
          <Typography variant="h5" align="center" mt={2}>
            Search Results
          </Typography>
          <Grid container spacing={3} justifyContent="center" my={2}>
            {movies.map((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h5" align="center" mt={2}>
            Trending Movies
          </Typography>
          <Grid container spacing={3} justifyContent="center" my={2}>
            {trending.map((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Home;