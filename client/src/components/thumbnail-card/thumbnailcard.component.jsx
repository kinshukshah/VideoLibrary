import React from "react";
import { withRouter } from "react-router";
import "./thumbnail.styles.css";
const ThumbnailCard = ({
  thumbnail,
  duration,
  videoId,
  history,
  sidevideo,
  filePath,
}) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  return (
    <div
      className={`thumbnail-card ${sidevideo ? "sidevideo" : null}`}
      onClick={() => history.push(`/video/${videoId}`)}
    >
      {/* <img src={`http://localhost:5000/${thumbnail}`} alt="Thumbnail"></img> */}
      <video src={`${filePath}#t=2,3`}></video>
      <div className="duration">
        <span>
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
};
export default withRouter(ThumbnailCard);
