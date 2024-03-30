import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { required } from "./required";

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    p: 4,
    margin: "auto",
    width: "50%",
    justifyContent: "center",
  },
  boxStyle: {
    // display: "flex",
    justifyContent: "space-between",
  },
  innerBox: {
    display: "flex",
    gap: "1rem",
  },
  buttonBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    alignItems: "center",
    mt: 3,
    mb: 2,
  },
};

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const CreateUser = () => {
  const [value, setValue] = React.useState({ code: "", country: "" });
  const [error, setError] = useState("");

  const [userDetails, setUserDetails] = useState({
    email: "",
    countryCode: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUserDetails({ ...userDetails, countryCode: value.code });
    console.log("userDetails: ", userDetails);
    const reqrd = required(userDetails);
    if (reqrd) {
      setError("All fields are required");
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    await axios
      .post("/admin/user", { ...userDetails }, { headers })
      .then((res) => {
        console.log(res);
        setUserDetails({
          email: "",
          countryCode: "",
          phone: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      component="form"
      // noValidate
      onSubmit={handleSubmit}
      sx={style.form}
    >
      <Typography variant="" sx={{ fontSize: "small", color: "red" }}>
        {error}
      </Typography>
      <Typography variant="" sx={{ fontSize: "large" }}>
        Enter Phone Number
      </Typography>
      <Box sx={style.innerBox}>
        <Autocomplete
          id="combo-box-demo"
          options={countryCodes}
          getOptionLabel={(option) => option.code}
          sx={{ mt: 2, mb: 2 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id="countryCode"
              name="countryCode"
              placeholder="+91"
              variant="outlined"
            />
          )}
          disableClearable
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          name="phone"
          autoComplete="phone"
          type="number"
          placeholder="000 000 0000"
          value={userDetails.phone}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Typography variant="" sx={{ fontSize: "large" }}>
          Enter Email address
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder="john@gmail.com"
          onChange={handleChange}
          value={userDetails.email}
        />
      </Box>

      <Typography variant="" sx={{ fontSize: "large" }}>
        Enter User's Name
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        name="name"
        autoComplete="name"
        type="text"
        placeholder="John Doe"
        onChange={handleChange}
        value={userDetails.name}
      />
      <Typography variant="" sx={{ fontSize: "large" }}>
        Enter User's Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        autoComplete="password"
        type="password"
        placeholder="************"
        onChange={handleChange}
        value={userDetails.password}
      />
      <Typography variant="" sx={{ fontSize: "large" }}>
        Re-enter User's Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        autoComplete="confirmPassword"
        type="password"
        placeholder="************"
        onChange={handleChange}
        value={userDetails.confirmPassword}
      />
      <Box sx={style.buttonBox}>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUser;
