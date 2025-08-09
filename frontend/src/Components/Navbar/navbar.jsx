import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SideNavbar from "../Side-Navbar/SideNavbar";
import Login from "../Login/login";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = ({ setsideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState("");
  const [navbarModal, setnavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  const handleClickModal = () => {
    setnavbarModal((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setsideNavbarFunc(!sideNavbar);
  };

  const handleProfile = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setnavbarModal(false);
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const handleModalOptionClick = (button) => {
    setnavbarModal(false);

    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };

  const getLogoutFun = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      console.log("Logout successful");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userProfilePic = localStorage.getItem("userProfilePic");
    const userId = localStorage.getItem("userId");
    setIsLogedIn(userId !== null);
    if (userProfilePic) {
      setUserPic(userProfilePic);
    }
  }, []);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);

    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={"/"} className="navbar-youtubeImg">
          <YouTubeIcon sx={{ fontSize: "34px", color: "red" }} className="nav-youtubeImage" />
          <div className="navbar-youtubeTitle">YouTube</div>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <div className="navbar-searchbox">
          <input
            type="text"
            placeholder="Search"
            className="navbar-searchbox-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="navbar-searchIconBox" onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "28px", color: "white", cursor: "pointer" }} />
          </div>
        </div>
        <div className="navbar-mic">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {!isLogedIn ? (
          <div className="navbar-signin" onClick={() => handleModalOptionClick("login")}>
            <PersonIcon className="navbar-signin-icon" />
            <span className="navbar-signin-text">Sign In</span>
          </div>
        ) : (
          <>
            <Link to={`/${localStorage.getItem("userId")}/upload`}>
<span style={{ color: "white" }}>Upload</span>
              <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
            </Link>
            <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
            <img
              onClick={handleClickModal}
              src={userPic}
              alt="Logo"
              className="navbar-right-logo"
            />

            {navbarModal && (
              <div className="navbar-modal">
                <div className="navbar-modal-option" onClick={handleProfile}>
                  Profile
                </div>
                <div
                  className="navbar-modal-option"
                  onClick={() => handleModalOptionClick("logout")}
                >
                  Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Login Modal */}
      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;
