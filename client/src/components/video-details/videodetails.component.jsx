import React from "react";
import moment from "moment";
import "./videodetails.styles.css";
const VideoDetails = ({ title, writer, views, createdAt }) => {
  return (
    <div className="video-details">
      <div className="avatar">
        <img
          src="https://material-ui.com/static/images/avatar/1.jpg"
          alt="Avatar1"
          class="img_round"
        />
      </div>
      <div className="details">
        <span>{title}</span>
        <span>{writer}</span>
        <span>
          {views}views - {moment(createdAt).format("MMM Do YY")}
        </span>
      </div>
    </div>
  );
};
export default VideoDetails;
