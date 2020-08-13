import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)
  const [numUpVotes, setNumUpVotes] = React.useState(0)
  const [numDownVotes, setNumDownVotes] = React.useState(0)

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  function clickUpVotes () {
    if ((numUpVotes === 0) && (numDownVotes === 0)) {
      setNumUpVotes(1)
    } else if (numUpVotes === 1) {
      setNumUpVotes(0)
    } else if ((numUpVotes === 0) && (numDownVotes === 1)) {
      setNumDownVotes(0)
    }
  }

  function clickDownVotes () {
    if ((numDownVotes === 0) && (numUpVotes === 0)) {
      setNumDownVotes(1)
    } else if (numDownVotes === 1) {
      setNumDownVotes(0)
    } else if ((numDownVotes === 0) && (numUpVotes === 1)) {
      setNumUpVotes(0)
    }
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={() => clickUpVotes()}>↑</button>
          <span className="center">
            {(props.post.upVotes + numUpVotes) - (props.post.downVotes + numDownVotes)}
          </span>
          <button onClick={() => clickDownVotes()}>↓</button>
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
