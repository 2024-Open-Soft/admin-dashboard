import React from "react";
import { Box, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VideoTable from "../components/VideoTable";
import UserTable from "../components/UserTable";
import PlanTable from "../components/PlanTable";
import SubscriptionsTable from "../components/Subscriptions";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectedUserforSubs = useSelector(
    (state) => state.usersubscription.data
  );

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
                <Tab label="Movies" value="1" />
                <Tab label="Plans" value="2" />
                <Tab label="Users" value="3" />
                <Tab
                  label={`Subscriptions ${
                    selectedUserforSubs.user
                      ? "( " + selectedUserforSubs.user + " )"
                      : ""
                  }`}
                  disabled={!selectedUserforSubs.user}
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel sx={{ height: "70vh", p: 0 }} value="1">
              <VideoTable />{" "}
            </TabPanel>
            <TabPanel value="2" sx={{ height: "70vh", p: 0 }}>
              <PlanTable />{" "}
            </TabPanel>
            <TabPanel value="3" sx={{ height: "70vh", p: 0 }}>
              <UserTable setValue={setValue} />{" "}
            </TabPanel>
            <TabPanel value="4" sx={{ height: "70vh", p: 0 }}>
              <SubscriptionsTable />{" "}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

export default AdminPage;
