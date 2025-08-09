import React from "react";
import "./signup.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Signup = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    email: "", 
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");

    try {
      setProgressBar(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dojvm3yyg/image/upload",
        data
      );
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.log(err);
      setProgressBar(false);
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignup = async () => {
    // Validation
    if (!validateEmail(signUpField.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (signUpField.password.length < 5 || signUpField.password.length > 15) {
      toast.error("Password must be 5 to 15 characters long.");
      return;
    }

    // Use default image if none uploaded
    const finalSignUpData = {
      ...signUpField,
      profilePic: signUpField.profilePic || ".../src/assets/unknownUser",
    };

    setProgressBar(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        finalSignUpData
      );
      setProgressBar(false);

      toast.success(res.data.msg || "Signup Successful");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));

        navigate("/"); // Auto-login
      }
    } catch (err) {
      setProgressBar(false);
      console.log(err);
      toast.error(err?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup">
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          Signup
        </div>

        <div className="signUp_Inputs">
          <input
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, "channelName")}
            type="text"
            placeholder="Channel Name"
            className="signUP_Inputs_inp"
          />
          <input
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, "userName")}
            type="text"
            placeholder="User Name"
            className="signUP_Inputs_inp"
          />
          <input
            value={signUpField.email}
            onChange={(e) => handleInputField(e, "email")}
            type="email"
            placeholder="Email Address"
            className="signUP_Inputs_inp"
          />
          <input
            value={signUpField.password}
            onChange={(e) => handleInputField(e, "password")}
            type="password"
            placeholder="Password (5–15 characters)"
            className="signUP_Inputs_inp"
          />
          <input
            value={signUpField.about}
            onChange={(e) => handleInputField(e, "about")}
            type="text"
            placeholder="About Your Channel"
            className="signUP_Inputs_inp"
          />
          <label>Profile</label>
          <div className="image_upload_signup">
            <input type="file" onChange={(e) => uploadImage(e)} />
            <div className="image_upload_signup_div">
              <img
                src={uploadedImageUrl}
                alt="Profile pic"
                className="image_default_signUp"
              />
            </div>
          </div>

          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>
              SignUp
            </div>
            <Link to={"/"} className="signUpBtn">
              Home Page
            </Link>
          </div>

          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
