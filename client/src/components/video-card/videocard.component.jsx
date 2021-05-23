import React, { useState, useEffect } from "react";
import ThumbnailCard from "../thumbnail-card/thumbnailcard.component";
import VideoDetails from "../video-details/videodetails.component";
import "./videocard.styles.css";
import axios from "axios";
const VideoCard = (video) => {
  console.log(video);
  const { title, duration, views, thumbnail, createdAt, writer } = video.video;
  console.log(title, duration, views, thumbnail, createdAt, writer);
  return (
    <div className="video-card">
      <ThumbnailCard thumbnail={thumbnail} duration={duration} />
      <VideoDetails
        title={title}
        views={views}
        createdAt={createdAt}
        writer={writer === undefined ? "Default" : writer.name}
      />
    </div>
  );
};
export default VideoCard;
