import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const MovieCard = ({ movie }) => {
  return (
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
  );
};

export default MovieCard;
