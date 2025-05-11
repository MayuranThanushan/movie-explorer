import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu"; 

const Navbar = () => {
  const { state } = useAppContext();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Movie Explorer
        </Typography>

        <Box sx={{ display: { xs: "block", md: "none" }, mr: 2 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            component={Link}
            to="/favorites"
            variant="text"
            sx={{
              color: "inherit",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Badge badgeContent={state.favoriteMovies.length} color="secondary">
              Favorites
            </Badge>
          </Button>

          <Box sx={{ ml: 2 }}>
            <ThemeToggle />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
