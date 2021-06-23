import axios from "axios";
import React, { useEffect, useState } from "react";
import SideSingleVideo from "../side-single-video/sidesinglevideo.component";
import "./SideVideo.styles.css";

const SideVideo = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);
  return (
    <div className="side-video-section">
      {videos.map((video) => (
        <SideSingleVideo key={video._id} video={video} />
      ))}
    </div>
  );
};
export default SideVideo;
