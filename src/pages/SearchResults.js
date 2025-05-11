import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: "",
  });

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      );

      let filteredResults = res.data.results;

      if (filters.genre) {
        filteredResults = filteredResults.filter((movie) =>
          movie.genre_ids.includes(Number(filters.genre))
        );
      }

      if (filters.year) {
        filteredResults = filteredResults.filter(
          (movie) =>
            new Date(movie.release_date).getFullYear().toString() ===
            filters.year
        );
      }

      if (filters.rating) {
        filteredResults = filteredResults.filter(
          (movie) => movie.vote_average >= parseFloat(filters.rating)
        );
      }

      setResults((prev) => (page === 1 ? filteredResults : [...prev, ...filteredResults]));
      setHasMore(page < res.data.total_pages);
    } catch (error) {
      console.error("Search error", error);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query, filters]);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query, page, filters]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Search Results for: "{query}"
      </Typography>

      <FilterBar filters={filters} setFilters={setFilters} />

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
