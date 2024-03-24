import React from "react";
import Sidebar from "./components/Sidebar";
import { Box, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const AdminPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ height: "100%", display: "flex", width: "100%" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Typography variant="h4" sx={{ pl: 2, py: 4 }}>
          Account Information
        </Typography>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Videos" value="1" />
                  <Tab label="Subscription" value="2" />
                  <Tab label="Plans" value="3" />
                  <Tab label="Users" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Container One</TabPanel>
              <TabPanel value="2">Container Two</TabPanel>
              <TabPanel value="3">Container Three</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AdminPage;
