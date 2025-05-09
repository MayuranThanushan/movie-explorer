import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
    <Card sx={{ width: 200 }}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {movie.title}
        </Typography>
        <Typography variant="body2">
          {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default MovieCard;
