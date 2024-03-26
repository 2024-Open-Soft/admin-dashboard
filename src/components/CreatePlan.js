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

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const CreatePlan = () => {
  const [value, setValue] = React.useState("");

  const [userDetails, setUserDetails] = useState({
    price: "",
    name: "",
    dicountPercent: "",
    dicountAmount: "",
    features: [],
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleTagInputChange = (value, type) => {
    setUserDetails({
      ...userDetails,
      [type]: value,
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
            name="name"
            autoComplete="name"
            type="text"
            placeholder="Gold"
            onChange={handleChange}
            value={userDetails.name}
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
            value={userDetails.price}
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
            id="dicountPercent"
            name="dicountPercent"
            autoComplete="dicountPercent"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={userDetails.dicountPercent}
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
            value={userDetails.dicountAmount}
            placeholder="2"
          />
        </Box>
      </Box>
      <Typography variant="" sx={{ fontSize: "large", mt: 1, mb: 1 }}>
        Features
      </Typography>
      <TagInput
        style={{
          boxShadow: "none",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          width: "100%",
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
        onChange={(value) => handleTagInputChange(value, "features")}
        id="features"
        menuStyle={{ width: "100%" }}
        size="lg"
        value={userDetails.features}
        placeholder="720p"
      />

      <Box sx={style.buttonBox}>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePlan;
