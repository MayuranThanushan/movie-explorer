import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);

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
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
