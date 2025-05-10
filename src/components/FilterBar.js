import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useGenres } from "../hooks/useGenres";

const FilterBar = ({ filters, setFilters }) => {
  const genres = useGenres();

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre || ""}
          label="Genre"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, genre: e.target.value }))
          }
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
        value={filters.year || ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, year: e.target.value }))
        }
      />

      <TextField
        size="small"
        label="Min Rating"
        type="number"
        inputProps={{ min: 0, max: 10, step: 0.1 }}
        value={filters.rating || ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, rating: e.target.value }))
        }
      />
    </Box>
  );
};

export default FilterBar;
