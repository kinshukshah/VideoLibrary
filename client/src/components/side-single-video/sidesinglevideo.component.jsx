import React from "react";
import VideoDetails from "../video-details/videodetails.component";
import ThumbnailCard from "../thumbnail-card/thumbnailcard.component";
import "./sidesinglevideo.styles.css";

const SideSingleVideo = (video) => {
  const {
    title,
    duration,
    views,
    thumbnail,
    createdAt,
    writer,
    _id,
    filePath,
  } = video.video;
  return (
    <div className="side-single-video">
      <div className="thumbnail">
        <ThumbnailCard
          thumbnail={thumbnail}
          duration={duration}
          videoId={_id}
          filePath={filePath}
          sidevideo
        />
      </div>
      <div className="videodetails">
        <VideoDetails
          title={title}
          views={views}
          createdAt={createdAt}
          writer={writer === undefined ? "Default" : writer.name}
          sidevideo
        />
      </div>
    </div>
  );
};
export default SideSingleVideo;
