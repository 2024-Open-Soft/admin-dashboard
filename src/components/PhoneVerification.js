import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import "./style.css";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiOtpInput } from "mui-one-time-password-input";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const VerificationPhone = ({ setStep }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = React.useState("+91");

  const [value, setValue] = React.useState("");

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleSendOTP = async (event) => {
    event.preventDefault();

    console.log(phone, countryCode.code);
    console.log(countryCode.code + phone);

    try {
      const response = await axios.post("/otp/generate", {
        phoneNumber: countryCode.code + phone,
      });
      console.log(response);
      localStorage.setItem("token", response.data.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/otp/verify",
        {
          otp: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(response);
      localStorage.setItem("token", response.data.data.token);
    } catch (err) {
      console.log(err);
    }

    setStep(2);
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={7}
      sx={{
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
      }}
    >
      <Box
        component="form"
        // noValidate
        display="flex"
        flexDirection={"column"}
        onSubmit={handleSubmit}
        sx={{
          my: {
            xs: 4,
            sm: 6,
          },
          mx: {
            xs: 0,
            sm: 2,
          },
        }}
      >
        <Typography variant="" sx={{ fontSize: "large" }}>
          Enter Phone Number
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
                  onSubmit={handleSubmit}
                  id="countryCode"
                  name="countryCode"
                  variant="outlined"
                />
              )}
              disableClearable
              sx={{ mt: 1, mb: 2, mr: 2, width: "5rem" }}
              onChange={(event, newValue) => {
                setCountryCode(newValue);
              }}
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
              autoFocus
              sx={{
                mt: 1,
                mb: 2,
                mr: 2,
                p: 0,
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "#3076A8",
              height: "3.5rem",
              mb: 1,
              px: 4,
            }}
            variant="contained"
            onClick={handleSendOTP}
          >
            Send
          </Button>
        </Box>
        <Typography variant="" sx={{ fontSize: "large", mb: 1 }}>
          Enter OTP
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            width: "100%",
          }}
        >
          <MuiOtpInput
            length={6}
            value={value}
            onChange={handleValueChange}
            onSubmit={handleSubmit}
            id="otp"
            name="otp"
            sx={{
              gap: "10px",
              borderRadius: "10rem",
              height: "auto",
              mr: 2,
            }}
            className="otp"
          />
          <Button
            sx={{
              height: "3.5rem",
              px: 6,
            }}
            size="large"
            color="success"
            variant="contained"
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </Box>
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{
            mt: 2,
            width: "fit-content",
          }}
        >
          Next Step
        </Button>
        <Typography
          align="left"
          sx={{ mt: 2, fontStyle: "italic", opacity: "80%" }}
        >
          {"Having trouble? "}
          <Link href="#" variant="body1">
            {"Get Help"}
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

export default VerificationPhone;
