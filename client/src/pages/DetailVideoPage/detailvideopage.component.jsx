import React, { useState, useEffect } from "react";
import "./detailvideopage.styles.css";
import VideoDetails from "../../components/video-details/videodetails.component";
import axios from "axios";
const DetailVideoPage = ({ match }) => {
  const [video, setVideo] = useState("");
  const videoId = match.params.videoId;
  const videoVariable = { videoId };
  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideo(res.data.video);
      } else {
        alert("Video Not Found");
      }
    });
  }, []);
  return (
    <div className="detail-video-page">
      <div className="single-video">
        <video src={`http://localhost:5000/${video.filePath}`} controls></video>
        <VideoDetails
          title={video.title}
          views={video.views}
          createdAt={video.createdAt}
          writer={video.writer === undefined ? "Default" : video.writer.name}
        />
      </div>
    </div>
  );
};
export default DetailVideoPage;
