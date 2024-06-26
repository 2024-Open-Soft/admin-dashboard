import React from "react";
import { Box, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VideoUpload from "../components/VideoUpload";
import CreateUser from "../components/CreateUser";
import CreatePlan from "../components/CreatePlan";

const Upload = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
                <Tab label="Upload Movie" value="1" />
                <Tab label="Create User" value="2" />
                <Tab label="New Plan" value="3" />
              </TabList>
            </Box>
            <TabPanel sx={{ height: "70vh", p: 0 }} value="1">
              <VideoUpload />{" "}
            </TabPanel>
            <TabPanel sx={{ height: "70vh", p: 0 }} value="2">
              <CreateUser />{" "}
            </TabPanel>
            <TabPanel sx={{ height: "70vh", p: 0 }} value="3">
              <CreatePlan />{" "}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

export default Upload;
