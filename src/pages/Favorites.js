import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Grid, Typography, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
