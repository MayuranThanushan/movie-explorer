import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { state } = useAppContext();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Movie Explorer
        </Typography>

        <Box sx={{ mr: 2 }}>
          <Button
            component={Link}
            to="/favorites"
            variant="text"
            sx={{ color: "inherit", textTransform: "none" }}
          >
            <Badge badgeContent={state.favoriteMovies.length} color="secondary">
              Favorites
            </Badge>
          </Button>
        </Box>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
