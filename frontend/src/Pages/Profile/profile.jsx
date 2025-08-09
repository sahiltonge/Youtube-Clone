import React, { useState, useEffect } from "react";
import "./profile.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import SideNavbar from "../../Components/Side-Navbar/SideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);      // renamed from 'data' to 'videos'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`https://capstone-9ln6.onrender.com/video/${id}/channel`);
      setVideos(response.data.video);          // videos array from response.data.video
      setUser(response.data.video[0]?.user);   // user object from first video
    } catch (err) {
      console.log("Error fetching profile data:", err);
      toast.error("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  // Delete video handler
  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`https://capstone-9ln6.onrender.com/video/delete/${videoId}`, { withCredentials: true });
      toast.success("Video deleted successfully");

      // Remove deleted video from local state to update UI immediately
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video");
    }
  };

  // Navigate to edit video page
  const handleEdit = (videoId) => {
    navigate(`/video/update/${videoId}`);
  };

  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        {loading ? (
          <div style={{ color: "gray" }}>Loading profile...</div>
        ) : (
          <>
            <div className="profile-top-section">
              <div className="profile-top-section-profile">
                <img
                  src={user?.profilePic || "/default-profile.png"}
                  alt="Profile"
                  className="profile-top-section-img"
                />
              </div>

              <div className="profile_top_section_About">
                <div className="profile_top_section_About_Name">{user?.channelName}</div>
                <div className="profile-top-section-info">
                  {user?.userName} • {videos.length} video{videos.length !== 1 ? "s" : ""}
                </div>
                <div className="profile_top_section_info">{user?.about || "No description provided."}</div>
              </div>
            </div>

            <div className="profile_videos">
              <div className="profile_videos_title">
                Videos <ArrowRightIcon />
              </div>

              <div className="profileVideos">
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <div className="profileVideo_block" key={video._id}>
                      <Link to={`/watch/${video._id}`} className="profileVideo_block_thumbnail_link">
                        <div className="profileVideo_block_thumbnail">
                          <img
                            src={video.thumbnail || "/default-thumbnail.jpg"}
                            alt="Video Thumbnail"
                            className="profileVideo_block_thumbnail_img"
                          />
                        </div>
                      </Link>

                      <div className="profileVideo_block_detail">
                        <div className="profileVideo_block_detail_name">{video.title}</div>
                        <div className="profileVideo_block_detail_about">
                          Created at {video.createdAt?.slice(0, 10)}
                        </div>

                        {/* Edit and Delete buttons */}
                        <div className="profileVideo_actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(video._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(video._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "gray", paddingTop: "20px" }}>No videos found.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
