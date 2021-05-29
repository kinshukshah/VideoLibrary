import React, { useState, useEffect } from "react";
import "./detailvideopage.styles.css";
import VideoDetails from "../../components/video-details/videodetails.component";
import axios from "axios";
import SideVideo from "../../components/side-video/SideVideo.component";
import Subscribe from "../../components/Subscribe/subscribe.component";
const DetailVideoPage = ({ match }) => {
  const [video, setVideo] = useState("");
  const videoId = match.params.videoId;
  const videoVariable = { videoId };
  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((res) => {
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Video Not Found");
      }
    });
  }, [videoVariable]);
  if (video.writer) {
    return (
      <div className="detail-video-page">
        <div className="single-video">
          <video
            src={`http://localhost:5000/${video.filePath}`}
            controls
          ></video>
          <div className="video-details-detail-page">
            <VideoDetails
              title={video.title}
              views={video.views}
              createdAt={video.createdAt}
              writer={
                video.writer === undefined ? "Default" : video.writer.name
              }
            />
            <Subscribe
              userTo={video.writer._id}
              userToWriterName={video.writer.name}
              userFrom={localStorage.getItem("userId")}
            />
          </div>
        </div>
        <SideVideo />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default DetailVideoPage;
