import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    p: 4,
    margin: "auto",
    width: "50%",
    height: "100%",
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
  const [value, setValue] = React.useState("");

  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {};

  return (
    <Box
      component="form"
      // noValidate
      onSubmit={handleSubmit}
      sx={style.form}
    >
      <Typography variant="" sx={{ fontSize: "large" }}>
        Enter Phone Number
      </Typography>
      <Box sx={style.innerBox}>
        <Autocomplete
          id="combo-box-demo"
          options={countryCodes}
          getOptionLabel={(option) => option.code}
          sx={{ mt: 2, mb: 2 }}
          onChange={(event, newValue) => setValue(newValue)}
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
          placeholder="shubham@gmail.com"
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
        placeholder="Shubham Chadokar"
        onChange={handleChange}
        value={userDetails.name}
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
