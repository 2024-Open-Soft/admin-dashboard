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
    movieName: "",
    movieCertification: [
      {
        title: "",
      },
    ],
    genre: [
      {
        title: "",
      },
    ],
    cast: "",
    country: [
      {
        title: "",
      },
    ],
    director: "",
    language: [
      {
        title: "",
      },
    ],
    writer: "",
    releasedDate: "",
    imdbRating: "",
    imdbVotes: "",
    awardName: "",
    totalAwards: "",
    description: "",
  });

  const handleChange = (e) => {
    console.log("e.target.id : ", e.target.id);
    console.log("e.target.value : ", e.target.value);
    setMovieDetails({
      ...movieDetails,
      [e.target.id]: e.target.value,
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
      movieCertification: value.map((item) => item),
    });
  };

  const handleFileChange = (event) => {
    setMovieFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (e) => {};
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
              id="movieName"
              // label="Enter email"
              value={movieDetails.movieName}
              name="movieName"
              sx={{ mt: 1, mb: 2 }}
            />
          </Box>
          <Box sx={style.boxStyle}>
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
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Enter Genre
            </Typography>
            <Autocomplete
              multiple
              limitTags={2}
              id="genre"
              options={genres}
              getOptionLabel={(option) => option.title}
              onChange={handleAutoCompleteChange}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => <TextField {...params} id="genre" />}
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
              id="country"
              options={Countries}
              getOptionLabel={(option) => option.title}
              onChange={handleAutoCompleteChange}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => <TextField {...params} id="country" />}
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
              onChange={(value) => handleTagInputChange(value, "director")}
              value={movieDetails.director}
              id="director"
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
              id="cinemaLanguage"
              options={cinemaLanguages}
              getOptionLabel={(option) => option.title}
              onChange={handleAutoCompleteChange}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="cinemaLanguage " />
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
              id="writer"
              onChange={(value) => handleTagInputChange(value, "writer")}
              value={movieDetails.writer}
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
              id="cinemaLanguage"
              options={cinemaLanguages}
              onChange={handleAutoCompleteChange}
              getOptionLabel={(option) => option.title}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="cinemaLanguage " />
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
              id="released"
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
            <Box sx={style.boxStyle}>
              <Typography variant="" sx={{ fontSize: "midium" }}>
                Total Votes
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                name="imdbVotes"
                onChange={handleChange}
                value={movieDetails.imdbVotes}
                // label="Password"
                type="number"
                id="imdbvotes"
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
                Some Information
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
          Description
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          rows={3}
          multiline
          onChange={handleChange}
          value={movieDetails.description}
          // label="Password"
          type="text"
          id="description"
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
