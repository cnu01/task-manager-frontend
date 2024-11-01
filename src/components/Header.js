// src/components/Header.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Header = ({ onAddTask }) => {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ paddingY: 1, paddingX: 3, boxShadow: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6"></Typography>
        <Avatar
          onClick={handleProfileClick}
          src={user?.avatar || ""}
          sx={{
            cursor: "pointer",
            width: 36,
            height: 36,
            bgcolor: "secondary.main",
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
