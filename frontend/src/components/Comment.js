import React from "react";
import AddComment from "./AddComment";
import "./Post.css";

const Comment = props => {
  const [replyOpen, setReplyOpen] = React.useState(false);
  const originalVotes = props.comment.upVotes - props.comment.downVotes;
  const [votes, setVotes] = React.useState(0);

  const toggleReply = () => setReplyOpen(!replyOpen);

  const saveComment = commentData => {
    setReplyOpen(false);
    props.onComment(props.comment._id, commentData);
  };

  const upvote = () => {
    // if already upvoted, toggle off
    if (votes > originalVotes) {
      props.onUpvote(false);
      setVotes(originalVotes);
    } else {
      // switching from downvote to upvote - remove 1 from downvote5
      if (votes < originalVotes) {
        props.onDownvote(false);
      }
      props.onUpvote(true);
      setVotes(originalVotes + 1);
    }
  };

  const downvote = () => {
    // if already downvoted, toggle off
    if (votes < originalVotes) {
      props.onDownvote(false);
      setVotes(originalVotes);
    } else {
      // switching from upvote to downvote - remove 1 from upvote
      if (votes > originalVotes) {
        props.onUpvote(false);
      }
      props.onDownvote(true);
      setVotes(originalVotes - 1);
    }
  };

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={upvote}>↑</button>
          <span className="center">{votes}</span>
          <button onClick={downvote}>↓</button>
        </div>
        <div className="post-body">
          <div className="author">Posted by {props.comment.author}</div>
          <div>{props.comment.text}</div>
          <div className="button-row">
            <button onClick={_ => props.onDelete(props.comment._id)}>
              Delete
            </button>
            <button onClick={toggleReply}>Reply</button>​
            {replyOpen && (
              <AddComment
                onSubmit={saveComment}
                onCancel={() => setReplyOpen(false)}
              />
            )}
          </div>
        </div>
      </section>
      <section className="comments">
        {props.comment.comments.map(com => (
          <Comment
            key={com._id}
            comment={com}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
            onComment={props.onComment}
          />
        ))}
      </section>
    </>
  );
};

export default Comment;
