import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  
  const [upVoteCurr, statusUp] = React.useState(false)
  const [downVoteCurr, statusDown] = React.useState(false)

  const toggleUp = () => {
    statusUp(!upVoteCurr)
    if (!upVoteCurr) {
      props.post.upVotes += 1
      const center = document.querySelector(".center");
      center.style.color = "orange";
      
    }
    else {
      props.post.upVotes -= 1
      if(!downVoteCurr){
        const center = document.querySelector(".center");
        center.style.color = "black";
      }
    }
    if (downVoteCurr) {
      toggleDown()
    }
  }

  const toggleDown = () => {
    statusDown(!downVoteCurr)
    if (!downVoteCurr) {
      props.post.downVotes += 1
      const center = document.querySelector(".center");
      center.style.color = "blue";
    }
    else {
      props.post.downVotes -= 1
      if(!upVoteCurr){
        const center = document.querySelector(".center");
        center.style.color = "black";
      }
    }
    if (upVoteCurr) {
      toggleUp()
    }
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={toggleUp}>↑</button>
          <span className="center">
            {props.post.upVotes - props.post.downVotes}
          </span>
          <button onClick={toggleDown}>↓</button>
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
