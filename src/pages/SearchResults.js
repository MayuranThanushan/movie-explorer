import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "68b0765a6d5c51653ecdd4bda511cc24";

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      setResults((prev) => [...prev, ...res.data.results]);
      setHasMore(page < res.data.total_pages);
    } catch (error) {
      console.error("Search error", error);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query, page]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Search Results for: "{query}"</Typography>
      <Grid container spacing={2}>
        {results.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box textAlign="center" mt={3}>
          <Button variant="contained" onClick={() => setPage(page + 1)}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;
