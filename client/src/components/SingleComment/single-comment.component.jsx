import React, { useState } from "react";
import axios from "axios";
import "./single-comment.styles.css";

const SingleComment = ({
  writer,
  content,
  postId,
  commentId,
  handleRefereshComment,
}) => {
  const [comment, setComment] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const toggleReplyTo = () => {
    setOpenReply(!openReply);
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let commentVariable = {
      writer: localStorage.getItem("userId"),
      postId,
      content: comment,
      responseTo: commentId,
    };
    axios.post("/api/comment/saveComment", commentVariable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setComment("");
        setOpenReply(!openReply);
        handleRefereshComment(res.data.comment);
      } else {
        alert("Something went wrong !! Could not post the comment");
      }
    });
  };
  return (
    <>
      <div className="single-comment">
        <div className="comment-avatar">
          <img
            src="https://material-ui.com/static/images/avatar/1.jpg"
            alt="Avatar1"
            class="img_round"
          />
        </div>
        <div className="comment-details">
          <p className="writer">{writer}</p>
          <p>{content}</p>
        </div>
      </div>
      <div>
        <span className="reply-to" onClick={toggleReplyTo}>
          Reply to
        </span>
      </div>
      {openReply && (
        <form className="submit-comment-form" onSubmit={handleSubmit}>
          <div className="comment-section">
            <textarea
              placeholder="Write some comments"
              onChange={handleChange}
              value={comment}
            ></textarea>
            <button className="submit-comment-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export default SingleComment;
