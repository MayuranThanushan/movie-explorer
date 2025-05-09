import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      onSearch(query);
    };
  
    return (
      <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", justifyContent: "center", my: 4 }}>
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
