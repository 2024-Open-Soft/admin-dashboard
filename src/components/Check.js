import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
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
  const [movieDetails, setMovieDetails] = useState({
    movieName: "",
    movieCertification: [{ type: "" }],
    genre: "",
    cast: [],
    country: "",
    director: "",
    language: "",
    writer: "",
    releasedDate: "",
    imdbRating: "",
    imdbVotes: "",
    awardName: "",
    totalAwards: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setMovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Special handler for TagInput changes
  const handleCastChange = (value, type) => {
    console.log("type : ", type.id);
    console.log("value : ", value);
    setMovieDetails({
      ...movieDetails,
      [type]: value,
    });
  };

  console.log(movieDetails);

  return (
    <div style={{ margin: "auto", width: "50rem" }}>
      <Box sx={style.boxStyle}>
        <Typography variant="body1" sx={{ fontSize: "large" }}>
          Enter Cast Name
        </Typography>
        <TagInput
          style={{
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            width: "100%",
            marginTop: "0.5rem",
            marginBottom: "1rem",
          }}
          id="cast"
          onChange={(value) => handleCastChange(value, "cast")}
          size="lg"
          value={movieDetails.cast} // Ensure TagInput is controlled by passing the current state
        />
      </Box>
    </div>
  );
};

export default Check;
