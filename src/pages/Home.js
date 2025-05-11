import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, Divider, Box, CircularProgress } from "@mui/material";
import tmdb from "../api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get("/trending/movie/week");
        setTrending(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error.message);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const res = await tmdb.get("/search/movie", {
        params: { query },
      });
      setMovies(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "background.default" }}>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {movies.length > 0 ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Search Results
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {movies.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Trending Movies
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {trending.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;