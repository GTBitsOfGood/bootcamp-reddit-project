import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)
  const [vote, setVote] = React.useState(0)

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  function toggleUpvote() {
    if (vote === 1) {
      setVote(0)
      props.onUnUpvote()
    } else {
      setVote(1)
      props.onUpvote()
      if (vote === -1) {
        props.onUnDownvote()
      }
    }
  }

  function toggleDownvote() {
    if (vote === -1) {
      setVote(0)
      props.onUnDownvote()
    } else {
      setVote(-1)
      props.onDownvote()
      if (vote === 1) {
        props.onUnUpvote()
      }
    }
  }

  function voteCountColor() {
    if (vote === 1) {
      return " up";
    } else if (vote === -1) {
      return " down";
    }
    return ""
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={toggleUpvote}>↑</button>
          <span className={`center${voteCountColor()}`}>
            {props.post.upVotes - props.post.downVotes + vote}
          </span>
          <button onClick={toggleDownvote}>↓</button>
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
          />
        ))}
      </section>
    </>
  )
}

export default Post
