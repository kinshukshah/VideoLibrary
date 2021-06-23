import React, { useState, useEffect } from "react";
import ThumbnailCard from "../thumbnail-card/thumbnailcard.component";
import VideoDetails from "../video-details/videodetails.component";
import { withRouter } from "react-router";
import "./videocard.styles.css";
import axios from "axios";
const VideoCard = ({ video, history }) => {
  const {
    title,
    duration,
    views,
    thumbnail,
    createdAt,
    writer,
    _id,
    filePath,
  } = video;
  console.log(video.filePath);
  return (
    //onClick={() => history.push(`/video/${_id}`)}
    <div className="video-card">
      {/* <video src={`${filePath}#t=2,3`}></video> */}
      <ThumbnailCard
        thumbnail={thumbnail}
        duration={duration}
        videoId={_id}
        filePath={filePath}
      />
      <VideoDetails
        title={title}
        views={views}
        createdAt={createdAt}
        writer={writer === undefined ? "Default" : writer.name}
      />
    </div>
  );
};
export default withRouter(VideoCard);
