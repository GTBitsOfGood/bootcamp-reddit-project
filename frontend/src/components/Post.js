import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const [currentVote, updateVote] = React.useState(0)
  const [upVote, toggleUpVote] = React.useState(false)
  const [downVote, toggleDownVote] = React.useState(false)

  const updateUpVote = () => {
    let increment = 0
    if (downVote) {
      toggleDownVote(false)
      props.decrementDown()
      increment += 1
    }
    if (upVote) {
      toggleUpVote(false)
      props.decrementUp()
      updateVote(currentVote - 1)
    } else {
      toggleUpVote(true)
      increment += 1
      props.incrementUp()
      updateVote(currentVote + increment)
    }
  }

  const updateDownVote = () => {
    let decrement = 0
    if (upVote) {
      toggleUpVote(false)
      props.decrementUp()
      decrement -= 1
    }
    if (downVote) {
      toggleDownVote(false)
      props.decrementDown()
      updateVote(currentVote + 1)
    } else {
      toggleDownVote(true)
      decrement -= 1
      props.incrementDown()
      updateVote(currentVote + decrement)
    }
  }

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={updateUpVote}>↑</button>
          <span className="center">
            {/* {props.post.upVotes - props.post.downVotes} */currentVote}
          </span>
          <button onClick={updateDownVote}>↓</button>
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
