import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Link,
  TextField,
  Autocomplete,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import React, { useState } from "react";
import { DatePicker, TagInput } from "rsuite";
import {
  cinemaLanguages,
  countries,
  genres,
  movieCertifications,
} from "../data";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const VideoUpload = () => {
  const dispatch = useDispatch();
  const Countries = useSelector((state) => state.country.data);

  const [moviefile, setMovieFile] = useState(null);

  const [movieDetails, setMovieDetails] = useState({
    title: "",
    plot: "",
    genres: [],
    runtime: "",
    cast: "",
    languages: [],
    released: "",
    directors: [],
    rated: "",
    imdb: {
      rating: "",
      votes: "",
    },
    countries: [],
    type: "movie",
    tomatoes: {
      viewer: {
        rating: "",
        numReviews: "",
        meter: "",
      },
    },
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setMovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagInputChange = (value, type) => {
    setMovieDetails({
      ...movieDetails,
      [type]: value,
    });
  };

  const handleAutoCompleteChange = (event, value) => {
    setMovieDetails({
      ...movieDetails,
      [event.target.id]: value.map((item) => item.title),
    });
  };

  const handleFileChange = (event) => {
    setMovieFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/admin/uploadmovie", movieDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(movieDetails);
      console.log("Movie uploaded successfully:", response.data);
      // Reset form fields or navigate to another page upon successful upload
    } catch (error) {
      console.error("Error uploading movie:", error);
    }
  };
  return (
    <div>
      <Box component={"form"} onSubmit={handleSubmit} sx={style.form}>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Movie Name
            </Typography>
            <TextField
              margin="normal"
              size="small"
              onChange={handleChange}
              required
              fullWidth
              id="title"
              // label="Enter email"
              value={movieDetails.title}
              name="title"
              sx={{ mt: 1, mb: 2 }}
            />
          </Box>
          {/* <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Movie Certification
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              id="movieCertification"
              onChange={handleAutoCompleteChange}
              options={movieCertifications}
              getOptionLabel={(option) => option.type}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="movieCertifications" />
              )}
            />
          </Box> */}
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Genres
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              id="genres"
              onChange={handleAutoCompleteChange}
              options={genres}
              getOptionLabel={(option) => option.title}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="genres" />
              )}
            />
          </Box>
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
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
              onChange={(value) => handleTagInputChange(value, "cast")}
              id="cast"
              menuStyle={{ width: "100%" }}
              size="lg"
              value={movieDetails.cast}
            />
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Select Country
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              onOpen={() => countries(dispatch)}
              id="countries" // Changed id to match schema
              options={Countries}
              getOptionLabel={(option) => option.title}
              onChange={handleAutoCompleteChange}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => <TextField {...params} id="countries" />} // Changed id to match schema
            />
          </Box>

          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Enter Director Name
            </Typography>
            <TagInput
              style={{
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                width: "100%",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
              onChange={(value) => handleTagInputChange(value, "directors")} // Changed "director" to "directors" to match schema
              value={movieDetails.directors} // Changed "director" to "directors" to match schema
              id="directors" // Changed id to match schema
              menuStyle={{ width: "100%" }}
              size="lg"
            />
          </Box>

        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Select Language
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              id="languages" // Changed id to match schema
              options={cinemaLanguages}
              getOptionLabel={(option) => option.title}
              onChange={handleAutoCompleteChange}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="languages" /> // Changed id to match schema
              )}
            />
          </Box>

          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Enter Writer Name
            </Typography>
            <TagInput
              style={{
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                width: "100%",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
              id="writers" // Changed id to match schema
              onChange={(value) => handleTagInputChange(value, "writers")} // Changed "writer" to "writers" to match schema
              value={movieDetails.writers} // Changed "writer" to "writers" to match schema
              menuStyle={{ width: "100%" }}
              size="lg"
            />
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Select Language
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              id="languages" // Changed id to match schema
              options={cinemaLanguages}
              onChange={handleAutoCompleteChange}
              getOptionLabel={(option) => option.title}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="languages" /> // Changed id to match schema
              )}
            />
          </Box>

          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Select Released Date
            </Typography>
            <DatePicker
              style={{
                boxShadow: "none",
                outline: "none",
                width: "100%",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
              onChange={(value) => handleTagInputChange(value, "releasedDate")}
              id="releasedDate" // Changed id to match schema
              size="lg"
            />
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="fontSize1"
            sx={{ fontSize: "large", mb: 1, width: "48%" }}
          >
            IMDB
          </Typography>
          <Typography
            variant="fontSize1"
            sx={{ fontSize: "large", mb: 1, width: "48%" }}
          >
            Award
          </Typography>
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "48%",
            }}
          >
            <Box sx={style.boxStyle}>
              <Typography variant="" sx={{ fontSize: "midium" }}>
                Movie Rating
              </Typography>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="imdbRating"
                onChange={handleChange}
                value={movieDetails.imdbRating}
                // label="Enter email"
                name="imdbRating"
                sx={{ mt: 1, mb: 2 }}
              />
            </Box>
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "48%",
            }}
          >
            <Box sx={style.boxStyle}>
              <Typography variant="" sx={{ fontSize: "midium" }}>
                Some Information.
              </Typography>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="awardName"
                onChange={handleChange}
                value={movieDetails.awardName}
                // label="Enter email"
                name="awardName"
                sx={{ mt: 1, mb: 2 }}
              />
            </Box>
            <Box sx={style.boxStyle}>
              <Typography variant="" sx={{ fontSize: "midium" }}>
                Total awards
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                onChange={handleChange}
                value={movieDetails.totalAwards}
                name="totalAwards"
                // label="Password"
                type="number"
                id="totalAwards"
                sx={{ mt: 1, mb: 2 }}
              />
            </Box>
          </Box>
        </Box>
        <Typography variant="" sx={{ fontSize: "large" }}>
          plot
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="plot"
          rows={3}
          multiline
          onChange={handleChange}
          value={movieDetails.description}
          id="plot" // Changed id to match schema
          sx={{ mt: 1, mb: 2 }}
        />
        <Box sx={style.buttonBox}>
          <Button
            component="label"
            role="button"
            variant="contained"
            onChange={handleFileChange}
            accept="video/*"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default VideoUpload;
