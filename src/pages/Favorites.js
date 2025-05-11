import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, Divider } from "@mui/material";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <Typography variant="h5" align="center" mt={2}>
        Your Favorites
      </Typography>
      
      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        You have {favorites.length} favorite movies.
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No favorite movies added yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" my={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
