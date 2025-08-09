import React from "react";
import './App.css'
import { useState , useEffect } from "react";
import { Route,Routes } from "react-router-dom";
import axios from "axios";

import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/Home/home";
import Video from "./Pages/Video/video";
import Profile from "./Pages/Profile/profile";
import VideoUpload from "./Pages/VideoUpload/videoupload";
import Signup from "./Pages/Signup/signup";
import Login from "./Components/Login/login";
import SearchResults from "./Components/SearchResult/SearchResult";
import VideoUpdateForm from "./Components/VideoUpdate/VideoUpdate";

function App(){

  const [sideNavbar,setsideNavbar] = useState(true)

  // useEffect(()=>{
  //   axios.get('http://localhost:3000/api/allvideo').then(res=>{
  //     console.log(res)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // },[])

  const setsideNavbarFunc=(value)=>{
    setsideNavbar(value)

  }

return(
  <div className="App">
    <Navbar setsideNavbarFunc={setsideNavbarFunc} sideNavbar={sideNavbar}/>
    <Routes>
      <Route path="/" element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path="/watch/:id" element={<Video/>}/>
      <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path="/:id/upload" element={<VideoUpload/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/video/update/:id" element={<VideoUpdateForm />} />


    </Routes>
    
  </div>
)

}

export default App;