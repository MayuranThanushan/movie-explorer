import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, CircularProgress, Divider } from "@mui/material";
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
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
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
    setLoading(false);
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
    <Box p={3} sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Typography variant="h4" mb={2} align="center" color="primary">
        Search Results for: "{query}"
      </Typography>

      <FilterBar filters={filters} setFilters={setFilters} />

      <Divider sx={{ my: 3 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {results.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {hasMore && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setPage(page + 1)}
                sx={{
                  "&:hover": { backgroundColor: "primary.dark" },
                  transition: "all 0.3s",
                }}
              >
                Load More
              </Button>
            </Box>
          )}

          {!hasMore && results.length === 0 && (
            <Typography variant="h6" color="text.secondary" textAlign="center" mt={3}>
              No results found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchResults;
