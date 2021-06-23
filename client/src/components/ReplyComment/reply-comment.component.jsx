import React, { useEffect, useState } from "react";
import SingleComment from "../SingleComment/single-comment.component";
import "./reply-comment.styles.css";

const ReplyComment = ({
  commentlist,
  postId,
  handleRefereshComment,
  parentCommentId,
}) => {
  const [viewMore, setViewMore] = useState(false);
  const [childCommentNumber, setChildCommentNumber] = useState(0);

  useEffect(() => {
    let commentNumber = 0;
    commentlist.map((comment) => {
      if (comment.responseTo == parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentlist, parentCommentId]);

  const handleViewMoreChange = () => {
    setViewMore(!viewMore);
  };
  return (
    <div>
      {childCommentNumber > 0 && (
        <p className="view-more" onClick={handleViewMoreChange}>
          View {childCommentNumber} more comments
        </p>
      )}
      {viewMore &&
        commentlist.map((comment) => (
          <>
            {comment.responseTo === parentCommentId && (
              <div className="reply-component">
                <SingleComment
                  key={comment._id}
                  writer={comment.writer.name}
                  content={comment.content}
                  postId={postId}
                  handleRefereshComment={handleRefereshComment}
                  commentId={comment._id}
                />
                <ReplyComment
                  commentlist={commentlist}
                  postId={postId}
                  handleRefereshComment={handleRefereshComment}
                  parentCommentId={comment._id}
                />
              </div>
            )}
          </>
        ))}
    </div>
  );
};
export default ReplyComment;
