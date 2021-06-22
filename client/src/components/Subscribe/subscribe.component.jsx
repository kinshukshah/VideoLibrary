import axios from "axios";
import React, { useState, useEffect } from "react";
import "./subscribe.styles.css";

const Subscribe = ({ userTo, userFrom, userToWriterName }) => {
  const [subscribeNumber, setSubscribeNumber] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeVariable = { userTo, userFrom };
  useEffect(() => {
    axios
      .post("/api/subscribe/subscribeNumber", subscribeVariable)
      .then((res) => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        } else {
          alert("Could not get the subscriber number");
        }
      });

    axios.post("/api/subscribe/issubscribed", subscribeVariable).then((res) => {
      if (res.data.success) {
        setIsSubscribed(res.data.isSubscribed);
      } else {
        alert("Something went wrong");
      }
    });
  }, []);
  const handleSubscibe = () => {
    if (isSubscribed) {
      let isConfirmed = window.confirm(`Unsubscribe from ${userToWriterName}`);
      if (isConfirmed) {
        axios
          .post("/api/subscribe/unsubscribe", subscribeVariable)
          .then((res) => {
            if (res.data.success) {
              setIsSubscribed(false);
              setSubscribeNumber(res.data.subscribeNumber);
            } else {
              alert("Something went wrong! Could not unsubscribe");
            }
          });
      } else {
        return;
      }
    } else {
      axios
        .post("/api/subscribe/subscribetovideo", subscribeVariable)
        .then((res) => {
          if (res.data.success) {
            setIsSubscribed(true);
            setSubscribeNumber(res.data.subscribeNumber);
          } else {
            setIsSubscribed(false);
            alert("Was not able to subscribe");
          }
        });
    }
  };
  return (
    <div className="subscribe-btn-component">
      <button
        className={`subscribe-btn ${
          isSubscribed ? "already-subscribed" : null
        }`}
        onClick={handleSubscibe}
      >
        {subscribeNumber} {isSubscribed ? "Subscribed" : `Subscribe`}
      </button>
    </div>
  );
};

export default Subscribe;
