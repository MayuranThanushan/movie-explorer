import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { useGenres } from "../hooks/useGenres";

const FilterBar = () => {
  const { state, dispatch } = useAppContext();
  const genres = useGenres();

  const handleGenreChange = (e) => {
    dispatch({ type: "SET_GENRE", payload: e.target.value });
  };

  const handleYearChange = (e) => {
    dispatch({ type: "SET_YEAR", payload: e.target.value });
  };

  const handleRatingChange = (e) => {
    dispatch({ type: "SET_RATING", payload: e.target.value });
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
      flexWrap="wrap"
      mb={3}
      sx={{ justifyContent: "space-between" }}
    >
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={state.filters.genre || ""}
          label="Genre"
          onChange={handleGenreChange}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.dark',
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        size="small"
        label="Year"
        type="number"
        value={state.filters.year || ""}
        onChange={handleYearChange}
        sx={{
          minWidth: 150,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.dark',
          },
        }}
      />

      <TextField
        size="small"
        label="Min Rating"
        type="number"
        inputProps={{ min: 0, max: 10, step: 0.1 }}
        value={state.filters.rating || ""}
        onChange={handleRatingChange}
        sx={{
          minWidth: 150,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.dark',
          },
        }}
      />
    </Box>
  );
};

export default FilterBar;
