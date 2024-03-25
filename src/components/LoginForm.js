import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

const style = {
  h1: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333333",
  },
  mainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: 24,
    backgroundColor: "#ffffff",
    width: {
      xs: "70%",
      sm: "40%",
    },
    margin: "auto",
    mt: {
      xs: "5rem",
      sm: "10rem",
    },
  },
  textStyle: { width: "100%", marginBottom: "1rem" },
  buttonBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};

const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", userDetails.email, "Password:", userDetails.password);
    // You can add your authentication logic here
  };

  return (
    <Box component={"form"} sx={style.mainBox} onSubmit={handleSubmit}>
      <h1 style={style.h1}>Login</h1>
      <Typography variant="fontSize3" width="100%" color="primary">
        Enter Email
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        id="email"
        type="email"
        value={userDetails.username}
        onChange={handleChange}
        required
        style={style.textStyle}
      />
      <Typography variant="fontSize3" width="100%" color="primary">
        Enter Password
      </Typography>
      <TextField
        label="Password"
        variant="outlined"
        id="password"
        type="password"
        value={userDetails.password}
        onChange={handleChange}
        required
        style={style.textStyle}
      />
      <Box sx={style.buttonBox}>
        <Button href="/" variant="contained" color="secondary" sx={{}}>
          back
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{}}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
