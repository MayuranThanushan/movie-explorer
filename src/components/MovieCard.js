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
    <Box sx={{ position: "relative", width: 250, boxShadow: 3, borderRadius: 2, overflow: "hidden", transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.05)" } }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Card sx={{ width: "100%", borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="350"
            image={imageError ? "/path/to/default-image.jpg" : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={handleImageError}
            sx={{
              objectFit: "cover",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
          <CardContent sx={{ padding: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average}
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <CardActions
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          borderRadius: "50%",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
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
