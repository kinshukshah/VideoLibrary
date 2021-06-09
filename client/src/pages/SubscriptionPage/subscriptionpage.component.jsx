import axios from "axios";
import React, { useEffect, useState } from "react";
import SubscriberList from "../../components/subscriber-list/subscriberlist.component";
import "./subscriptionpage.styles.css";

const SubscriptionPage = () => {
  const [subscriber, setSubscriber] = useState([]);
  let subscriberVariable = { userFrom: localStorage.getItem("userId") };
  useEffect(() => {
    axios
      .post("/api/subscribe/getSubscriptionVideos", subscriberVariable)
      .then((res) => {
        if (res.data.success) {
          setSubscriber(res.data.users);
        } else {
          alert("Something went wrong! Could not load subscribers");
        }
      });
  }, []);
  return (
    <div className="container">
      <h2>Subscriptions</h2>
      <hr />
      <div className="subscriptions">
        {subscriber
          ? subscriber.map((user) => <SubscriberList name={user.name} />)
          : null}
      </div>
    </div>
  );
};
export default SubscriptionPage;
