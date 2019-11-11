import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import "./Post.css";

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false);
  const originalVotes = props.post.upVotes - props.post.downVotes;
  const [newVotes, setNewVotes] = React.useState(originalVotes);

  const toggleReply = () => setReplyOpen(!replyOpen);

  const saveComment = commentData => {
    setReplyOpen(false);
    props.onComment(props.post._id, commentData);
  };

  const upvote = () => {
    // if already upvoted, toggle off
    if (newVotes > originalVotes) {
      props.onUpvote(false);
      setNewVotes(originalVotes);
    } else {
      // switching from downvote to upvote - remove 1 from downvote5
      if (newVotes < originalVotes) {
        props.onDownvote(false);
      }
      props.onUpvote(true);
      setNewVotes(originalVotes + 1);
    }
  };

  const downvote = () => {
    // if already downvoted, toggle off
    if (newVotes < originalVotes) {
      props.onDownvote(false);
      setNewVotes(originalVotes);
    } else {
      // switching from upvote to downvote - remove 1 from upvote
      if (newVotes > originalVotes) {
        props.onUpvote(false);
      }
      props.onDownvote(true);
      setNewVotes(originalVotes - 1);
    }
  };

  // maybe try to make arrow bold once hit?
  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={upvote}>↑</button>
          <span
            className={
              "center" +
              (newVotes != originalVotes
                ? newVotes > originalVotes
                  ? "-upvoted"
                  : "-downvoted"
                : "")
            }
          >
            {newVotes}
          </span>
          <button onClick={downvote}>↓</button>
        </div>
        <div className="post-body">
          <div className="author">Posted by {props.post.author}</div>
          <div className="header">{props.post.title}</div>
          <div>{props.post.text}</div>
          <div className="button-row">
            <button onClick={() => props.onDelete(props.post._id)}>
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
        {props.post.comments.map(com => (
          <Comment
            key={com._id}
            comment={com}
            onDelete={props.onCommentDelete}
            onEdit={props.onCommentEdit}
            onComment={props.onSubComment}
            onUpvote={props.onUpvote}
            onDownvote={props.onDownvote}
          />
        ))}
      </section>
    </>
  );
};

export default Post;
