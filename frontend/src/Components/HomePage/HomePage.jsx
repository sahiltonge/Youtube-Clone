import React from "react";
import { useEffect,useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage({sideNavbar}) {

  const [data,setdata] = useState([])

   useEffect(()=>{
    axios.get('https://capstone-9ln6.onrender.com/video/allvideo').then(res=>{
      console.log(res.data.videos)
      setdata(res.data.videos)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const options = [
    "All",
    "Trending",
    "Music",
    "Gaming",
    "News",
    "Live",
    "Movies",
    "Sports",
    "Fashion & Beauty",
    "Learning",
    "Podcasts",
    "Technology",
    "Comedy",
    "Entertainment",
    "Documentary",
    "Science",
    "Travel",
    "Food",
    "Cars",
    "Health",
    "Kids",
    "History",
  ];

  return (
    <div className={sideNavbar ? "homePage" : 'fullHomePage'}>
      <div className="homePage-options">
        {options.map((item, index) => {
          return (
            <div key={index} className="homePage-option">
              {item}
            </div>
          );
        })}
      </div>

      <div className={sideNavbar ? "home-mainPage" : "home-mainPageWithoutSidebar"}>

      {
        data?.map((item, ind) => {
    return (
      <Link to={`/watch/${item._id}`} className="youtube-Video" key={item._id}>
        <div className="youtube-thumbnailBox">
          <img src={item.thumbnail} alt="thumbnail" className="youtube-thumbnailPic" />
          <div className="youtube-timingThumbnial">
            28
          </div>
        </div>

        <div className="youtube-TitleBox">
          <div className="youtubeTitleBoxProfile">
            <img src={item?.user?.profilePic} alt="Profile" className="youtube-thumbnail-profile" />
          </div>
          <div className="youtubetitleBox-Title">
            <div className="youtube-videotitle">{item?.title}</div>
            <div className="youtube-channelName">{item?.user?.channelName}</div>
            <div className="youtube-views">{item?.like || 0} likes</div>
          </div>
        </div>
      </Link>
    )
  })
      }

      </div>
    </div>
  );
}

export default HomePage;
