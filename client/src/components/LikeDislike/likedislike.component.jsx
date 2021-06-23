import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./likedislike.styles.css";

const LikeDislike = ({ videoId, commentId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  let userId = localStorage.getItem("userId");
  let variable = { videoId, commentId, userId };
  useEffect(() => {
    let likedislikeVariable;
    if (videoId) {
      likedislikeVariable = { userId: localStorage.getItem("userId"), videoId };
    } else {
      likedislikeVariable = {
        userId: localStorage.getItem("userId"),
        commentId,
      };
    }
    axios.post("/api/like/getlikedvideo", likedislikeVariable).then((res) => {
      if (res.data.success) {
        setLikeCount(res.data.likes.length);
        res.data.likes.map((like) => {
          if (like.userId === userId) {
            setIsLiked(true);
          }
        });
      } else {
        alert("Could not fetch like video");
      }
    });
    axios
      .post("/api/dislike/getdislikedvideo", likedislikeVariable)
      .then((res) => {
        if (res.data.success) {
          setDislikeCount(res.data.dislikes.length);
          res.data.dislikes.map((dislike) => {
            if (dislike.userId === userId) {
              setIsDisliked(true);
            }
          });
        } else {
          alert("Could not fetch like video");
        }
      });
  }, [videoId, commentId, userId]);

  const handleLikeClick = () => {
    // let likeVariable;
    // if (videoId) {
    //   likeVariable = { userId: localStorage.getItem("userId"), videoId };
    // } else {
    //   likeVariable = { userId: localStorage.getItem("userId"), commentId };
    // }
    if (isLiked) {
      axios.post("/api/like/removelike", variable).then((res) => {
        if (res.data.success) {
          setLikeCount((likeCount) => likeCount - 1);
          setIsLiked(false);
        } else {
          alert("Could not remove like");
        }
      });
    } else {
      // if (isDisliked) {
      //   handleDislikeClick();
      // }
      axios.post("/api/like/addlike", variable).then((res) => {
        if (res.data.success) {
          setLikeCount((likeCount) => likeCount + 1);
          setIsLiked(true);
          if (isDisliked) {
            setDislikeCount((dislikeCount) => dislikeCount - 1);
            setIsDisliked(false);
          }
        } else {
          alert("Could not add like");
        }
      });
    }
  };
  const handleDislikeClick = () => {
    // let dislikeVariable;
    // if (videoId) {
    //   dislikeVariable = { userId: localStorage.getItem("userId"), videoId };
    // } else {
    //   dislikeVariable = { userId: localStorage.getItem("userId"), commentId };
    // }
    if (isDisliked) {
      axios.post("/api/dislike/removedislike", variable).then((res) => {
        if (res.data.success) {
          setDislikeCount((dislikeCount) => dislikeCount - 1);
          setIsDisliked(false);
        } else {
          alert("Could not remove dislike");
        }
      });
    } else {
      // if (isLiked) {
      //   handleLikeClick();
      // }
      axios.post("/api/dislike/adddislike", variable).then((res) => {
        if (res.data.success) {
          setDislikeCount((dislikeCount) => dislikeCount + 1);
          setIsDisliked(true);
          if (isLiked) {
            setLikeCount((likeCount) => likeCount - 1);
            setIsLiked(false);
          }
        } else {
          alert("Could not add dislike");
        }
      });
    }
  };
  return (
    <div className="like-dislike">
      <div
        onClick={handleLikeClick}
        className={`like ${isLiked ? "isliked" : "notliked"}`}
      >
        <i class="fas fa-thumbs-up"></i>
        <span>{likeCount}</span>
      </div>
      <div
        onClick={handleDislikeClick}
        className={`dislike ${isDisliked ? "isdisliked" : "notliked"}`}
      >
        <i class="fas fa-thumbs-down"></i>
        <span>{dislikeCount}</span>
      </div>
    </div>
  );
};
export default LikeDislike;
