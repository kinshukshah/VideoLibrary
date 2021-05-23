import React from "react";
import "./thumbnail.styles.css";
const ThumbnailCard = ({ thumbnail, duration }) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  console.log(thumbnail);
  return (
    <div className="thumbnail-card">
      <img src={`http://localhost:5000/${thumbnail}`} alt="Thumbnail"></img>
      <div className="duration">
        <span>
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
};
export default ThumbnailCard;
