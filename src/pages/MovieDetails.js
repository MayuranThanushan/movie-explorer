import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import {
  Box,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  Button
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
          tmdb.get(`/movie/${id}/videos`)
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

  if (!movie) return <CircularProgress sx={{ mt: 5, display: "block", mx: "auto" }} />;

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" mb={1}>
            Release Date: {movie.release_date}
          </Typography>
          <Box mb={2}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography mb={2}>{movie.overview}</Typography>

          <Typography variant="h6">Cast</Typography>
          {cast.map((actor) => (
            <Typography key={actor.id}>
              {actor.name} as {actor.character}
            </Typography>
          ))}

          {trailerUrl && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>Trailer</Typography>
              <Box
                component="iframe"
                width="100%"
                height="400"
                src={trailerUrl.replace("watch?v=", "embed/")}
                title="YouTube Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{ border: 0, borderRadius: 2 }}
              />

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
