import React, { useState } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLoginFun = async () => {
  if (!loginField.email || !loginField.password) {
    toast.error("Please enter email and password");
    return;
  }

  setLoader(true);
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/login",
      loginField,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    setLoader(false);

    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("userProfilePic", res.data.user.profilePic);

    toast.success("Login Successful!");
    window.location.reload();
  } catch (err) {
    setLoader(false);
    toast.error("Invalid Credentials");
    console.error(err);
  }
};


  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Login
        </div>

        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              placeholder="Email"
              value={loginField.email}
              onChange={(e) => handleOnChangeInput(e, "email")}
              className="userNameLoginUserName"
            />
          </div>

          <div className="userNameLogin">
            <input
              type="password"
              placeholder="Password"
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              className="userNameLoginUserName"
            />
          </div>
        </div>

        <div className="login_buttons">
          <div className="login-btn" onClick={handleLoginFun}>
            Login
          </div>
          <Link to="/signup" className="login-btn" onClick={() => setLoginModal()}>
            Signup
          </Link>
          <div className="login-btn" onClick={() => setLoginModal()}>
            Cancel
          </div>
        </div>

        {loader && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
