import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: "flex", justifyContent: "center", my: 4 }}
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: "60%" }}
      />
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
