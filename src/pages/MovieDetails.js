import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import {
  Box,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/credits`),
          tmdb.get(`/movie/${id}/videos`),
        ]);

        setMovie(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 5));

        const trailer = videosRes.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Error loading movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie)
    return (
      <CircularProgress sx={{ mt: 5, display: "block", mx: "auto" }} />
    );

  return (
    <Box p={3} sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "100%",
              borderRadius: 10,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="h6" color="textSecondary" mb={2}>
            Release Date: {movie.release_date}
          </Typography>

          <Box mb={2}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Box>

          <Typography variant="body1" mb={2}>
            {movie.overview}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" mb={1} fontWeight="bold">
            Cast
          </Typography>

          <Grid container spacing={1}>
            {cast.map((actor) => (
              <Grid item key={actor.id} xs={12} sm={6} md={4}>
                <Typography variant="body2" fontWeight="medium">
                  <strong>{actor.name}</strong> as <em>{actor.character}</em>
                </Typography>
              </Grid>
            ))}
          </Grid>

          {trailerUrl && (
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Trailer
              </Typography>
              <Box
                component="iframe"
                width="100%"
                height="400"
                src={trailerUrl.replace("watch?v=", "embed/")}
                title="YouTube Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  border: 0,
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              />

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    "&:hover": { backgroundColor: "error.dark" },
                    transition: "background-color 0.3s",
                  }}
                >
                  Watch on YouTube
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails;
