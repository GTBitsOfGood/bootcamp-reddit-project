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

  const [upVoted, setUpVoted] = React.useState(false)
  const [downVoted, setDownVoted] = React.useState(false)
  const [color, setColor] = React.useState("white")

  const updateVotes = (event) => {

    if ((event.target.name === "upVoter") && (!upVoted) && (downVoted)) {
      setUpVoted(true)
      setDownVoted(false)
      props.post.upVotes = props.post.upVotes + 1
      props.post.downVotes = props.post.downVotes - 1
      props.onUpVote()
      props.onUnDownVote()
      setColor("orange")
    } else if ((event.target.name === "downVoter") && (!downVoted) && (upVoted)) {
      setUpVoted(false)
      setDownVoted(true)
      props.post.upVotes = props.post.upVotes - 1
      props.post.downVotes = props.post.downVotes + 1
      props.onUnUpVote()
      props.onDownVote()
      setColor("purple")
    } else if ((event.target.name === "upVoter") && (upVoted)) {
      setUpVoted(false)
      setDownVoted(false)
      props.post.upVotes = props.post.upVotes - 1
      props.onUnUpVote()
      setColor("white")
    } else if ((event.target.name === "downVoter") && (downVoted)) {
      setUpVoted(false)
      setDownVoted(false)
      props.post.downVotes = props.post.downVotes - 1
      props.onUnDownVote()
      setColor("white")
    } else if ((event.target.name === "upVoter") && (!upVoted)) {
      setUpVoted(true)
      setDownVoted(false)
      props.post.upVotes = props.post.upVotes + 1
      setColor("orange")
      props.onUpVote()
    } else if ((event.target.name === "downVoter") && (!downVoted)) {
      setUpVoted(false)
      setDownVoted(true)
      props.post.downVotes = props.post.downVotes + 1
      props.onDownVote()
      setColor("purple")
    }

  }


  return (
    <>
      <section className="post">
        <div className="arrows">
          <button name = "upVoter" onClick = {(e) => updateVotes(e)} className = {(upVoted) ? "upVoted":"default"}>↑</button>
          <span className="center">
            {props.post.upVotes - props.post.downVotes}
          </span>
          <button name = "downVoter" onClick = {(e) => updateVotes(e)} className = {(downVoted) ? "downVoted":"default"}>↓</button>
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
