import React, { useState } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const origVote = props.post.upVotes - props.post.downVotes;

  const [votes, setVote] = useState(origVote);

  const upvote = () => {
    if (votes === origVote) {
      props.upVote(true);
      setVote(origVote + 1);
    } else if (votes < origVote) {
      setVote(origVote + 1);
      props.upVote(true);
      props.downVote(false);
    } else {
      setVote(origVote);
      props.upVote(false);
    }
  };

  const downVote = () => {
    if (votes === origVote) {
      setVote(origVote - 1);
      props.downVote(true)
    } else if (votes > origVote) {
      setVote(origVote - 1);
      props.upVote(false);
      props.downVote(true);
    } else {
      setVote(origVote);
      props.downVote(false);
    }
  };
  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={upvote}>↑</button>
          <span className="center">
            {votes}
          </span>
          <button onClick={downVote}>↓</button>
        </div>
        <div className="post-body">
          <div className="author">Posted by {props.post.author}</div>
          <div className="header">{props.post.title}</div>
          <div>{props.post.text}</div>
          <div className="button-row">
            <button onClick={() => props.onDelete(props.post._id)}>
              Delete
            </button>
            <button onClick={toggleReply}>Reply</button>
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
          />
        ))}
      </section>
    </>
  )
}

export default Post
