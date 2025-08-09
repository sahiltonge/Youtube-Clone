import React from "react";
import "./video.css";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Video = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoURL] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  
  const [likes, setLikes] = useState([] || data.like);
  const [dislikes, setDislikes] = useState([] || data.dislike);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  
  const userId = localStorage.getItem("userId");

  const fetchVideoById = async () => {
    await axios
      .get(`http://localhost:3000/video/getVideoById/${id}`)
      .then((response) => {
        console.log(response.data.video);
        setData(response.data.video);
        setVideoURL(response.data?.video?.videoLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommentByvideoId = async () => {
    await axios
      .get(`http://localhost:3000/comment/comment/${id}`)
      .then((response) => {
        console.log(response);
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchVideoById();
    getCommentByvideoId();
  }, []);

  const handleComment = async () => {
    const body = {
      video: id,
      message: message,
    };
    await axios
      .post("http://localhost:3000/comment/comment", body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const newComment = res.data.comment;
        newComment.user = currentUser;
        setComments([newComment, ...comments]);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please Login first to comment");
      });
  };

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setCurrentUser(JSON.parse(userFromStorage));
    }
  }, []);

  const token = localStorage.getItem("token"); // or wherever you store it

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/video/like/${id}`,
        {},
        { withCredentials: true }
      );
      const updatedVideo = res.data.video;
      
      setLikes(updatedVideo.like);
      setDislikes(updatedVideo.dislike);
      setLiked(updatedVideo.likedBy.includes(userId));
      setDisliked(updatedVideo.dislikedBy.includes(userId));
    } catch (error) {
      console.error("Error liking video:", error);
      toast.error("Error liking video");
    }
  };

  // Handle Dislike toggle
  const handleDislike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/video/dislike/${id}`,
        {},
        { withCredentials: true }
      );
      const updatedVideo = res.data.video;

      setLikes(updatedVideo.like);
      setDislikes(updatedVideo.dislike);
      setLiked(updatedVideo.likedBy.includes(userId));
      setDisliked(updatedVideo.dislikedBy.includes(userId));
    } catch (error) {
      console.error("Error disliking video:", error);
      toast.error("Error disliking video");
    }
  };

  return (
    <div className="video">
      <div className="videoPostSection">
        <div className="video-youtube">
          {data && (
            <video
              width="400"
              controls
              autoPlay
              className="video-youtube-player"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="video-youtubeAbout">
          <div className="video-utubeTitle">{data?.title}</div>
          <div className="youtube-video-profileBlock">
            <div className="youtube-video-profileBlock-left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="utube-video-profile-left-img"
              >
                <img
                  src={data?.user?.profilePic}
                  alt=""
                  className="utube-video-profile-left-image"
                />
              </Link>
              <div className="youtube-sub">
                <Link to={`/user/${data?.user?._id}`} className="user">
                  {data?.user?.channelName}
                </Link>
                <div className="date">{data?.user?.createdAt.slice(0, 10)}</div>
              </div>
              <div className="subBtnYoutube">Subscribe</div>
            </div>

             <div className="youtube-video-likeblock">
              <div
                className={`video-like ${liked ? "liked" : ""}`}
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              >
                <ThumbUpIcon />
                <div className="number-like">{likes}</div>
              </div>
              <div className="divider"></div>
              <div
                className={`video-dislike ${disliked ? "disliked" : ""}`}
                onClick={handleDislike}
                style={{ cursor: "pointer" }}
              >
                <ThumbDownIcon />
                <div className="number-like">{dislikes}</div>
              </div>
            </div>
          </div>
          <div className="youtube-video-about">
            <div>{data?.user?.createdAt.slice(0, 10)}</div>
            <div> {data?.description}</div>
          </div>
        </div>

        <div className="utube-comment-section">
          <div className="comment-sectionTitle"> {comments.length} Comment</div>
          <div className="youtube-SelfComment">
            <img
              src={currentUser?.profilePic || "/defaultProfile.png"}
              alt="Profile"
              className="video-selfcommentProfile"
            />
            <div className="addComment">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Add a comment"
                className="addInputComment"
              />
              <div className="canclesumbitcommit">
                <div className="cancle">Cancle</div>
                <div className="cancle" onClick={handleComment}>
                  Comment
                </div>
              </div>
            </div>
          </div>

          <div className="youtube-othersComment">
            {comments.map((item, index) => {
              return (
                <div key={item._id} className="youtube-SelfComment">
                  <img
                    src={item?.user?.profilePic}
                    alt="Profile_Pic"
                    className="video-selfcommentProfile"
                  />
                  <div className="others-commentSection">
                    <div className="others-commentSectionHeader">
                      <div className="channelName-comment">
                        {item?.user?.channelName}
                      </div>
                      <div className="commentTimingsOthers">
                        {item?.createdAt?.slice(0, 10)}
                      </div>
                    </div>
                    <div className="otherCommentSectionComment">
                      {item?.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="videoSuggestions">
        <label>Video Suggestion</label>
        <div className="videoSuggestionsBlock">
          <div className="video-suggestion-thumbnail">
            <img
              src="default.img"
              alt="thumbnail"
              className="video-suggestion-thumbnail-img"
            />
          </div>

          <div className="video-suggestions-about">
            <div className="video-suggestion-about-title">it is a title</div>
            <div className="video-suggestions-about-profile">Profile</div>
            <div className="video-suggestions-about-profile">view and day</div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video-suggestion-thumbnail">
            <img
              src="default.img"
              alt="thumbnail"
              className="video-suggestion-thumbnail-img"
            />
          </div>

          <div className="video-suggestions-about">
            <div className="video-suggestion-about-title">it is a title</div>
            <div className="video-suggestions-about-profile">Profile</div>
            <div className="video-suggestions-about-profile">view and day</div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video-suggestion-thumbnail">
            <img
              src="default.img"
              alt="thumbnail"
              className="video-suggestion-thumbnail-img"
            />
          </div>

          <div className="video-suggestions-about">
            <div className="video-suggestion-about-title">it is a title</div>
            <div className="video-suggestions-about-profile">Profile</div>
            <div className="video-suggestions-about-profile">view and day</div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video-suggestion-thumbnail">
            <img src="" alt="" className="video-suggestion-thumbnail-img" />
          </div>

          <div className="video-suggestions-about">
            <div className="video-suggestion-about-title">it is a title</div>
            <div className="video-suggestions-about-profile">Profile</div>
            <div className="video-suggestions-about-profile">view and day</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
