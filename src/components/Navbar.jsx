import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn, currentUser, cartCount } = useSelector(
    (state) => state.user
  );
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PSHOP
          </Typography>
        </a>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" href="/profile" startIcon={<PersonIcon />}>
            Profile
          </Button>
          <Button color="inherit" href="/history" startIcon={<HistoryIcon />}>
            History
          </Button>
          <Button color="inherit" href="/cart" startIcon={<ShoppingCartIcon />}>
            Cart {cartCount}
          </Button>
        </Box>

        <IconButton
          color="inherit"
          edge="end"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={closeMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem onClick={closeMenu} component="a" href="/profile">
            <PersonIcon sx={{ marginRight: 1 }} />
          </MenuItem>
          <MenuItem onClick={closeMenu} component="a" href="/history">
            <HistoryIcon sx={{ marginRight: 1 }} />
          </MenuItem>
          <MenuItem onClick={closeMenu} component="a" href="/cart">
            <ShoppingCartIcon sx={{ marginRight: 1 }} />{" "}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {cartCount}
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
