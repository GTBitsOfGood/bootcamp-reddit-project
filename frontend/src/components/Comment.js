import React from 'react'
import AddComment from './AddComment'
import './Post.css'

const Comment = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.comment._id, commentData)
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button>
            <div id="triangle-up-inactive"></div>
          </button>
          <span className="center">
            {props.comment.upVotes - props.comment.downVotes}
          </span>
          <button>
            <div id="triangle-down-inactive"></div>
          </button>
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
  )
}

export default Comment
