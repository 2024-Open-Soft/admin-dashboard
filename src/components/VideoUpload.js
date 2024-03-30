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
import axios from "axios";
import { required } from ".///required";
import { set } from "rsuite/esm/utils/dateUtils";
import createToast from "../utils/createToast";

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
  const [trailerfile, setTrilerFile] = useState(null);
  const [posterfile, setPosterFile] = useState(null);
  const [error, setError] = useState("");

  const [isRequired, setIsRequired] = useState(false);

  const [movieDetails, setMovieDetails] = useState({
    title: "",
    rated: [
      {
        title: "",
      },
    ],
    genres: [
      {
        title: "",
      },
    ],
    cast: "",
    countries: [
      {
        title: "",
      },
    ],
    directors: "",
    languages: [
      {
        title: "",
      },
    ],
    writer: "",
    released: "",
    imdbRating: "",
    imdbVotes: "",
    awardName: "",
    totalAwards: "",
    plot: "",
    runtime: "",
    nominations: "",
  });

  const handleChange = (e) => {
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

  const handleAutoCompleteChange = (event, value, key) => {
    setMovieDetails({
      ...movieDetails,
      [key]: Array.isArray(value)
        ? value.map((item) => item.title || item.type || item)
        : value.title || value.type || value,
    });
  };

  const handleFileChange = (event) => {
    setMovieFile(event.target.files[0]);
  };

  const handlePosterFileSubmit = async (id) => {
    const formData = new FormData();
    formData.append("file", posterfile);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(`/admin/movie/${id}/poster/upload`, formData, config)
      .then((res) => {
        // console.log(res);
        createToast(res?.data?.message || "Movie poster submitted", "success");
      })
      .catch((err) => {
        console.log(err);
        createToast("Movie poster submission failed", "error");
      });
  };
  const handleTrailerFileSubmit = async (id) => {
    const formData = new FormData();
    formData.append("file", trailerfile);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(`/admin/movie/${id}/trailer/upload`, formData, config)
      .then((res) => {
        // console.log(res);
        handlePosterFileSubmit(id);
        createToast("Movie trailer submitted", "success");
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.error === "Token Expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        createToast("Movie trailer submission failed", "error");
      });
  };

  const handleMovieFileSubmit = async (id) => {
    const formData = new FormData();
    formData.append("file", moviefile);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(`/admin/movie/${id}/upload`, formData, config)
      .then((res) => {
        // console.log(res);
        createToast("Movie file submitted", "success");
        handleTrailerFileSubmit(id);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.error === "Token Expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        createToast("Movie file submission failed", "error");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqrd = required(movieDetails);

    setIsRequired(reqrd);
    if (reqrd) {
      setError("All fields are required");
      return;
    } else if (!moviefile) {
      setError("Please upload movie file");
      return;
    }
    setError("");

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .post(
        `/admin/movie/upload`,
        {
          ...movieDetails,
          imdb: {
            id: Math.random(),
            rating: movieDetails.imdbRating,
            votes: movieDetails.imdbVotes,
          },
          awards: {
            nominations: movieDetails.nominations,
            text: movieDetails.awardName,
            wins: movieDetails.totalAwards,
          },
        },
        config
      )
      .then((res) => {
        // console.log(res);
        createToast(res?.data?.message || "Movie trailer submitted", "success");
        handleMovieFileSubmit(res.data?.data?.movie?._id);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.error === "Token Expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        createToast("Movie submission failed", "error");
      });
  };

  return (
    <div>
      <Box component={"form"} sx={style.form}>
        <Typography variant="" sx={{ fontSize: "small", color: "red" }}>
          {error}
        </Typography>
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
              //required
              fullWidth
              id="title"
              // label="Enter email"
              value={movieDetails.title}
              name="title"
              sx={{ mt: 1, mb: 2 }}
            />
          </Box>
          <Box sx={style.boxStyle}>
            <Typography variant="" sx={{ fontSize: "large" }}>
              Movie Certification
            </Typography>
            <Autocomplete
              limitTags={2}
              id="rated"
              onChange={(event, value) =>
                handleAutoCompleteChange(event, value, "rated")
              }
              options={movieCertifications}
              getOptionLabel={(option) => option.title || option.type}
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
              id="genres"
              options={genres}
              getOptionLabel={(option) => option.title || option.type}
              onChange={(event, value) =>
                handleAutoCompleteChange(event, value, "genres")
              }
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => <TextField {...params} id="genres" />}
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
              id="countries"
              options={Countries}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) =>
                handleAutoCompleteChange(event, value, "countries")
              }
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => <TextField {...params} id="countries" />}
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
              onChange={(value) => handleTagInputChange(value, "directors")}
              value={movieDetails.directors}
              id="directors"
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
              id="languages"
              options={cinemaLanguages}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) =>
                handleAutoCompleteChange(event, value, "languages")
              }
              size="small"
              sx={{ mt: 1, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} id="languages " />
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
              RunTime (in min)
            </Typography>
            <TextField
              margin="normal"
              size="small"
              onChange={handleChange}
              //required
              fullWidth
              id="runtime"
              type="number"
              // label="Enter email"
              value={movieDetails.runtime}
              name="runtime"
              sx={{ mt: 1, mb: 2 }}
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
              onChange={(value) => handleTagInputChange(value, "released")}
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
                //required
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
                //required
                fullWidth
                size="small"
                name="imdbVotes"
                onChange={handleChange}
                value={movieDetails.imdbVotes}
                // label="Password"
                type="number"
                id="imdbVotes"
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
                //required
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
                //required
                fullWidth
                size="small"
                id="totalAwards"
                onChange={handleChange}
                value={movieDetails.totalAwards}
                name="totalAwards"
                // label="Password"
                type="number"
                sx={{ mt: 1, mb: 2 }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={style.boxStyle}>
          <Typography variant="" sx={{ fontSize: "midium" }}>
            Total Nominations
          </Typography>
          <TextField
            margin="normal"
            size="small"
            //required
            fullWidth
            type="number"
            id="nominations"
            onChange={handleChange}
            value={movieDetails.nominations}
            // label="Enter email"
            name="nominations"
            sx={{ mt: 1, mb: 2 }}
          />
        </Box>
        <Typography variant="" sx={{ fontSize: "large" }}>
          Description
        </Typography>
        <TextField
          margin="normal"
          //required
          fullWidth
          name="plot"
          rows={3}
          multiline
          onChange={handleChange}
          value={movieDetails.plot}
          // label="Password"
          type="text"
          id="plot"
          sx={{ mt: 1, mb: 2 }}
        />
        <Box sx={style.buttonBox}>
          {!required(movieDetails) && (
            <Button
              component="label"
              role="button"
              variant="contained"
              onChange={(e) => setMovieFile(e.target.files[0])}
              accept="video/*"
              startIcon={<CloudUploadIcon />}
            >
              Upload Movie
              <VisuallyHiddenInput
                type="file"
                id="img"
                name="img"
                accept="video/*"
              />
            </Button>
          )}
          {!required(movieDetails) && (
            <Button
              component="label"
              role="button"
              variant="contained"
              onChange={(e) => setTrilerFile(e.target.files[0])}
              accept="video/*"
              startIcon={<CloudUploadIcon />}
              type="file"
            >
              Upload Trailer
              <VisuallyHiddenInput
                type="file"
                id="img"
                name="img"
                accept="video/*"
              />
            </Button>
          )}
          {!required(movieDetails) && (
            <Button
              component="label"
              role="button"
              variant="contained"
              onChange={(e) => setTrilerFile(e.target.files[0])}
              accept="image/*"
              startIcon={<CloudUploadIcon />}
              type="file"
            >
              Upload Poster
              <VisuallyHiddenInput
                type="file"
                id="img"
                name="img"
                accept="image/*"
              />
            </Button>
          )}
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default VideoUpload;
