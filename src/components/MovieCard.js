import React, { useState, useContext } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavoritesContext } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const [imageError, setImageError] = useState(false);

  const fav = isFavorite(movie.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (fav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box sx={{ position: "relative", width: 200 }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Card sx={{ width: 200 }}>
          <CardMedia
            component="img"
            height="300"
            image={imageError ? "/path/to/default-image.jpg" : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={handleImageError}
          />
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {movie.title}
            </Typography>
            <Typography variant="body2">
              {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average}
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <CardActions
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "rgba(0,0,0,0.4)",
          borderRadius: "50%",
        }}
      >
        <IconButton onClick={handleFavorite} color={fav ? "error" : "default"}>
          {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Box>
  );
};

export default MovieCard;
