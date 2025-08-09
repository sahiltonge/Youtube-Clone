import React, { useState, useEffect } from "react";
import "./videoupload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate("/");
    }
  }, [navigate]);

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dojvm3yyg/${type}/upload`,
        data
      );
      const url = response.data.url;
      setLoader(false);
      const val = type === "image" ? "thumbnail" : "videoLink";
      setInputField((prev) => ({
        ...prev,
        [val]: url,
      }));
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };

  const handleSumbitFun = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/video/upload",
        inputField,
        { withCredentials: true }
      );
      console.log(res);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
            type="text"
            placeholder="Title of Video"
            className="uploadFormInputs"
          />

          <input
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
            type="text"
            placeholder="Description"
            className="uploadFormInputs"
          />

          {/* DROPDOWN for Video Category */}
          <select
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
            className="uploadFormInputs"
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Vlogs">Vlogs</option>
          </select>

          {/* THUMBNAIL INPUT */}
          <div>
            <label htmlFor="thumbnailUpload">Thumbnail:</label>{" "}
            <input
              id="thumbnailUpload"
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
            />
          </div>

          {/* VIDEO FILE INPUT */}
          <div>
            <label htmlFor="videoUpload">Video:</label>{" "}
            <input
              id="videoUpload"
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadImage(e, "video")}
            />
          </div>

          {/* LOADING SPINNER */}
          {loader && (
            <Box sx={{ display: "flex", marginTop: "10px" }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        {/* BUTTONS */}
        <div className="uploadBtns">
          <div
            className="uploadBtn-form"
            onClick={!loader ? handleSumbitFun : undefined}
            style={{ opacity: loader ? 0.6 : 1, pointerEvents: loader ? "none" : "auto" }}
          >
            Upload
          </div>

          <Link to="/" className="uploadBtn-form">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
