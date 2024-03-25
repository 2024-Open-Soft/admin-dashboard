import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ height: "100%", display: "flex", width: "100%" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
