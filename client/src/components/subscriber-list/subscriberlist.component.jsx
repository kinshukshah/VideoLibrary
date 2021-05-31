import React from "react";
import "./subscriberlist.styles.css";

const SubscriberList = ({ name }) => {
  return (
    <div className="subscription-list">
      <img
        src="https://material-ui.com/static/images/avatar/1.jpg"
        alt="Avatar1"
        class="img_round"
      />
      <p>{name}</p>
    </div>
  );
};
export default SubscriberList;
