import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Avatar, Typography } from "@mui/material";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  p: 3,
  mt: 1,
  boxSizing: "border-box",
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
        <Avatar sx={{ height: "10rem", width: "10rem", mb: 2 }} />
        <Typography fontWeight="600" fontSize="1.2rem">
          Your Account
        </Typography>
        <Typography fontSize="1rem">Shubham</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Database" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
