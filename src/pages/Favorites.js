import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, Box, Divider, Paper, IconButton } from "@mui/material";
import { StarBorder } from "@mui/icons-material"; // Empty star icon for illustration

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Box sx={{ padding: 3, backgroundColor: "background.default" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Favorites
      </Typography>
      
      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        You have {favorites.length} favorite movie{favorites.length !== 1 && "s"}.
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            color: "text.secondary",
            borderRadius: 2,
            padding: 4,
            boxShadow: 2,
            backgroundColor: "background.paper",
          }}
        >
          <IconButton color="primary" sx={{ fontSize: 50 }}>
            <StarBorder />
          </IconButton>
          <Typography variant="h6" mt={2}>
            No favorite movies added yet.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center" my={2}>
            {favorites.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Favorites;
