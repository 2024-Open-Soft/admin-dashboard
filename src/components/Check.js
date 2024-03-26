import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { TagInput } from "rsuite";

const style = {
  form: { display: "flex", flexDirection: "column", p: 4 },
  boxStyle: {
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

const Check = () => {
  const [userDetails, setUserDetails] = useState({
    price: "",
    name: "",
  });

  const handleChange = (e) => {
    console.log("e.target.id : ", e.target.id);
    console.log("e.target.value : ", e.target.value);
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  // Special handler for TagInput changes

  return (
    <div style={{ margin: "auto", width: "50rem" }}>
      <Box sx={style.boxStyle}>
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
      </Box>
    </div>
  );
};

export default Check;
