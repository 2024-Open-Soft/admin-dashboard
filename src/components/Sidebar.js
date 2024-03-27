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
import { Link } from "react-router-dom";

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
          John Doe
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
      </List>
    </Box>
  );
}
