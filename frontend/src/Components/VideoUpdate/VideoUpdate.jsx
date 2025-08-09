import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./videoupdate.css";
import { Link, useNavigate } from "react-router-dom";

const VideoUpdateForm = ({ onUpdate }) => {
  const { id: videoId } = useParams(); // get videoId from URL

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  // Fetch video details on mount
  useEffect(() => {
    if (!videoId) {
      toast.error("Invalid video ID");
      setLoading(false);
      return;
    }

    const fetchVideoData = async () => {
      try {
        const res = await axios.get(`https://capstone-9ln6.onrender.com/video/${videoId}`);
        console.log("Fetched video data:", res.data.video);
        setData(res.data.video);
        setEditTitle(res.data.video.title || "");
        setEditDescription(res.data.video.description || "");
      } catch (error) {
        console.error("Error fetching video data:", error);
        toast.error("Failed to load video data");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  // Upload thumbnail file to Cloudinary
  const uploadThumbnail = async (file) => {
    console.log("Uploading thumbnail file:", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "youtube-clone");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dojvm3yyg/image/upload",
        formData
      );
      setUploading(false);
      console.log("Thumbnail uploaded successfully:", res.data.secure_url);
      return res.data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Thumbnail upload error:", error);
      toast.error("Thumbnail upload failed");
      return null;
    }
  };

  const handleUpdateVideo = async () => {
    console.log("Starting video update...");
    console.log("Video ID:", videoId);
    if (!videoId) {
      toast.error("Invalid video ID. Cannot update.");
      return;
    }

    let thumbnailUrl = data?.thumbnail || "";
    console.log("Current thumbnail URL:", thumbnailUrl);

    if (thumbnailFile) {
      console.log("Thumbnail file selected for upload.");
      const uploadedUrl = await uploadThumbnail(thumbnailFile);
      if (!uploadedUrl) {
        console.log("Thumbnail upload failed. Aborting update.");
        return;
      }
      thumbnailUrl = uploadedUrl;
    }

    try {
      const body = {
        title: editTitle,
        description: editDescription,
        thumbnail: thumbnailUrl,
      };

      console.log("Sending update request with data:", body);

      const res = await axios.put(
        `https://capstone-9ln6.onrender.com/video/update/${videoId}`,
        body,
        { withCredentials: true }
      );

      console.log("Update response received:", res);
      toast.success("Video updated successfully!");
      if (onUpdate) {
        console.log(
          "Calling onUpdate callback with updated video:",
          res.data.video
        );
        onUpdate(res.data.video);
      }
      navigate("/");
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video.");
    }
  };

  if (loading)
    return (
      <p style={{ color: "#e0e0e0", textAlign: "center" }}>
        Loading video details...
      </p>
    );

  return (
    <div className="video-update-form">
      <h3>Update Details</h3>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Edit Title"
        className="update-input"
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Edit Description"
        className="update-textarea"
        rows={4}
      />

      <div style={{ position: "relative" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("Thumbnail file selected:", e.target.files[0]);
            setThumbnailFile(e.target.files[0]);
          }}
          className="update-input"
          disabled={uploading}
        />
        {uploading && (
          <div className="loader-spinner" title="Uploading..."></div>
        )}
      </div>

      <button
        onClick={handleUpdateVideo}
        className="update-button"
        disabled={uploading}
      >
        Update
      </button>
    </div>
  );
};

export default VideoUpdateForm;
