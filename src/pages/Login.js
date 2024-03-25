import React from "react";
import LoginForm from "../components/LoginForm";
import { Box } from "@mui/material";

const style = {
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const Login = () => {
  return (
    <Box sx={style}>
      <LoginForm />
    </Box>
  );
};

export default Login;
