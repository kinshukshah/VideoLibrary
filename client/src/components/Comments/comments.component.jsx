import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleComment from "../SingleComment/single-comment.component";
import "./comments.styles.css";

const Comments = ({ postId, commentlist, handleRefereshComment }) => {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let commentVariable = {
      writer: localStorage.getItem("userId"),
      postId,
      content: comment,
    };
    axios.post("/api/comment/saveComment", commentVariable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setComment("");
        handleRefereshComment(res.data.comment);
      } else {
        alert("Something went wrong !! Could not post the comment");
      }
    });
  };
  useEffect(() => {
    console.log(commentlist);
  }, [commentlist]);

  return (
    <div>
      <br />
      <p>Replies</p>
      {commentlist.length > 0 &&
        commentlist.map(
          (comment) =>
            !comment.responseTo && (
              <SingleComment
                writer={comment.writer.name}
                content={comment.content}
                postId={postId}
                handleRefereshComment={handleRefereshComment}
                commentId={comment._id}
              />
            )
        )}
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
    </div>
  );
};
export default Comments;
