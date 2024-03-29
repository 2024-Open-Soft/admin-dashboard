import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import { TagInput } from "rsuite";
import { required } from "./required";
import axios from "axios";

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    p: 4,
    margin: "auto",
    width: "70%",
    height: "100%",
    justifyContent: "center",
  },
  boxStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  innerBox: {
    display: "flex",
    gap: "1rem",
    width: "48%",
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

const resolution = [
  {
    description: "Max Resolution - 144p",
    value: "144p",
  },
  {
    description: "Max Resolution - 240p",
    value: "240p",
  },
  {
    description: "Max Resolution - 360p",
    value: "360p",
  },
  {
    description: "Max Resolution - 480p",
    value: "480p",
  },
  {
    description: "Max Resolution - 720p",
    value: "720p",
  },
  {
    description: "Max Resolution - 1080p",
    value: "1080p",
  },
  {
    description: "Max Resolution - 1440p",
    value: "1440p",
  },
  {
    description: "Max Resolution - 2160p",
    value: "2160p",
  },
];

const CreatePlan = () => {
  const [error, setError] = useState("");

  const [planDetails, setPlanDetails] = useState({
    price: "",
    name: "",
    discountPercentage: "",
    dicountAmount: "",
    maxResolution: "",
    maxDevices: "",
  });

  const handleChange = (e) => {
    setPlanDetails({
      ...planDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleAutoCompleteChange = (event, value, key) => {
    setPlanDetails({
      ...planDetails,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqrd = required(planDetails);
    if (reqrd) {
      setError("All fields are required");
      return;
    }
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    setError("");
    await axios
      .post(
        "/admin/plan",
        {
          ...planDetails,
          features: [
            {
              name: "max-resolution",
              ...planDetails.maxResolution,
            },
            {
              name: "max-devices",
              description: `Max Devices - ${planDetails.maxDevices}`,
              value: planDetails.maxDevices,
            },
          ],
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
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
      <Box sx={style.boxStyle}>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large" }}>
            Plan
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="plan"
            autoComplete="plan"
            type="text"
            placeholder="Gold"
            onChange={handleChange}
            value={planDetails.name}
          />
        </Box>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large", mt: 1, mb: 1 }}>
            Price
          </Typography>
          <OutlinedInput
            id="price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            sx={{ mt: 2, mb: 2, width: "100%" }}
            onChange={handleChange}
            type="number"
            name="price"
            value={planDetails.price}
            placeholder="5"
          />
        </Box>
      </Box>
      <Box sx={style.boxStyle}>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large", mt: 1, mb: 1 }}>
            Dicount %
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="discountPercentage"
            name="discountPercentage"
            autoComplete="discountPercentage"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={planDetails.discountPercentage}
          />
        </Box>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large", mt: 1, mb: 1 }}>
            Dicount Amount
          </Typography>
          <OutlinedInput
            id="dicountAmount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            sx={{ mt: 2, mb: 2, width: "100%" }}
            onChange={handleChange}
            type="number"
            name="dicountAmount"
            value={planDetails.dicountAmount}
            placeholder="2"
          />
        </Box>
      </Box>
      <Box sx={style.boxStyle}>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large" }}>
            Max Resolution
          </Typography>
          <Autocomplete
            id="maxResolution"
            onChange={(event, value) =>
              handleAutoCompleteChange(event, value, "maxResolution")
            }
            options={resolution}
            getOptionLabel={(option) => option.value}
            size="large"
            sx={{ mt: 2, mb: 2 }}
            renderInput={(params) => (
              <TextField
                placeholder={"720"}
                type="text"
                {...params}
                id="maxResolution"
              />
            )}
          />
        </Box>
        <Box sx={{ width: "48%" }}>
          <Typography variant="" sx={{ fontSize: "large", mt: 1, mb: 1 }}>
            Max Devices
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="maxDevices"
            name="maxDevices"
            autoComplete="maxDevices"
            type="number"
            placeholder="2"
            onChange={handleChange}
            value={planDetails.maxDevices}
          />
        </Box>
      </Box>

      <Box sx={style.buttonBox}>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePlan;
