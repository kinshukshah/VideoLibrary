import React, { useState, useEffect } from "react";
import VideoCard from "../../components/video-card/videocard.component";
import "./homepage.style.css";
import axios from "axios";
const HomePage = () => {
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
  console.log(videos);
  return (
    <div className="container">
      <h2>Recommended</h2>
      <hr />
      <div className="videos-recommendation">
        {videos.length > 0
          ? videos.map((video) => <VideoCard video={video} />)
          : null}
      </div>
    </div>
  );
};
export default HomePage;
