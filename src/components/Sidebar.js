import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StorageIcon from "@mui/icons-material/Storage";
import BackupIcon from "@mui/icons-material/Backup";
import Divider from "@mui/material/Divider";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Avatar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "./utility";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  p: 6,
  mt: 1,
  boxSizing: "border-box",
};

const linkStyle = {
  width: "100%",
  textDecoration: "none",
  color: "black",
};

export default function Sidebar() {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(dispatch);
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 360,
        width: "25%",
        height: "100%",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box sx={boxStyle}>
        <Typography fontWeight="600" fontSize="1.2rem">
          {user ? user.name : "Admin"}
        </Typography>
        <Typography fontSize="1rem">Admin</Typography>
      </Box>
      <Divider />
      <List>
        <Link to="/database" style={linkStyle}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Database" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/analysis" style={linkStyle}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/upload" style={linkStyle}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BackupIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItemButton>
          </ListItem>
        </Link>
        {(user || user?.data) && (
          <ListItem sx={linkStyle} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
}
