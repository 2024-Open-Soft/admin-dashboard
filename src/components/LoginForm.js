import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, Box, Typography } from "@mui/material";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import createToast from "../utils/createToast";
import { useDispatch } from "react-redux";

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

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({
    phoneNumber: "",
    password: "",
  });
  const [countryCode, setCountryCode] = React.useState("+91");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("/user/login", {
        ...userDetails,
        phoneNumber: countryCode.code + userDetails.phoneNumber,
      })
      .catch((err) => {
        createToast(err?.response?.data?.error, "error");
        console.log(err);
      });
    if (response?.data?.data?.token)
      localStorage.setItem("token", response?.data?.data?.token);
    else
      localStorage.removeItem("token");

    if (response?.data?.data?.user)
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
    else{
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });    
    }

    if (response?.data?.data?.user) {
      createToast(response?.data?.message, "success");
      navigate("/");
    }
  };

  return (
    <Box component={"form"} sx={style.mainBox} onSubmit={handleSubmit}>
      <h1 style={style.h1}>Login</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          md: { flexDirection: "column" },
        }}
      >
        <Autocomplete
          id="combo-box-demo"
          options={countryCodes}
          getOptionLabel={(option) => option.code}
          renderInput={(params) => (
            <TextField
              {...params}
              id="countryCode"
              name="countryCode"
              variant="outlined"
            />
          )}
          disableClearable
          sx={{ mt: 1 }}
          onChange={(event, newValue) => {
            setCountryCode(newValue);
          }}
        />
        <TextField
          margin="normal"
          required
          id="phoneNumber"
          name="phone"
          autoComplete="phone"
          fullWidth
          type="number"
          placeholder="000 000 0000"
          onChange={handleChange}
        />
      </Box>
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
