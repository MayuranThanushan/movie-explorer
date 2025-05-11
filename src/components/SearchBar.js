import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
  const { state, dispatch } = useAppContext();
  const [query, setQuery] = useState(state.searchQuery || "");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(state.searchQuery);
  }, [state.searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch({ type: "SET_SEARCH_QUERY", payload: query });

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 4,
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: { xs: "80%", sm: "60%" },
          backgroundColor: "white",
        }}
        placeholder="Enter movie title"
      />
      <Button type="submit" variant="contained" sx={{ height: "100%" }}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
