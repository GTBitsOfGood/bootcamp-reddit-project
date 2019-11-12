import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const original = props.post.upVotes - props.post.downVotes

  const [votes, setVotes] = React.useState(original)
  
  const [state, setState] = React.useState(0)

  // let state = 0 // -1 is down, 0 is neutral, 1 is up

  const changeUpVote = () => {
    if (state === 0) {
      props.updateUpVote(true)
      setState(1)
      setVotes(original + 1)
    } else if (state === -1) {
      props.updateUpVote(true)
      props.updateDownVote(false)
      setState(1)
      setVotes(original + 1)
    } else {
      props.updateUpVote(false)
      setState(0)
      setVotes(original)
    }
  }

  const changeDownVote = () => {
    if (state === 0) {
      props.updateDownVote(true)
      setState(-1)
      setVotes(original - 1)
    } else if (state === 1) {
      props.updateUpVote(false)
      props.updateDownVote(true)
      setState(-1)
      setVotes(original - 1)
    } else {
      props.updateDownVote(false)
      setState(0)
      setVotes(original)
    }
  }
  
  // const changeUpVote = () => {
  //   if (votes === original) {
  //     setVotes(original + 1)
  //   } else if (votes === original - 1) {
  //     setVotes(original + 1)
  //   } else {
  //     setVotes(original)
  //   }
  // }

  // const changeDownVote = () => {
  //   if (votes === original) {
  //     setVotes(original - 1)
  //   } else if (votes === original + 1) {
  //     setVotes(original - 1)
  //   } else {
  //     setVotes(original)
  //   }
  // }

  const toggleReply = () => setReplyOpen(!replyOpen)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={changeUpVote}>↑</button>
          <span className="center">
            {votes}
          </span>
          <button onClick={changeDownVote}>↓</button>
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
