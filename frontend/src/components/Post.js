import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)
  const [voteCount, setVoteCount] = React.useState(0)
  const [upSelected, setUpSelected] = React.useState(false)
  const [downSelected, setDownSelected] = React.useState(false)


  const toggleUpSelected = () => {
    if (upSelected === false && downSelected === false) {
      setUpSelected(!upSelected)
      setVoteCount(voteCount + 1)
      props.updateUpVote(1)
    } else if (upSelected === false && downSelected === true){
      setDownSelected(!downSelected)
      setUpSelected(!upSelected)
      setVoteCount(voteCount + 2)
      props.updateUpVote(1)
      props.updateDownVote(-1)
    } else if (upSelected === true) {
      setUpSelected(!upSelected)
      setVoteCount(voteCount - 1)
      props.updateUpVote(-1)
    }
  } 
  
  const toggleDownSelected = () => {
    if (downSelected === false && upSelected === false) {
      setDownSelected(!downSelected)
      setVoteCount(voteCount - 1)
      props.updateDownVote(1)
    } else if (downSelected === false && upSelected === true){
      setUpSelected(!upSelected)
      setDownSelected(!downSelected)
      setVoteCount(voteCount - 2)
      props.updateDownVote(1)
      props.updateUpVote(-1)
    } else if (downSelected === true) {
      setDownSelected(!downSelected)
      setVoteCount(voteCount + 1)
      props.updateDownVote(-1)
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
          <button className={upSelected ? "post - selected" : "post"} onClick={toggleUpSelected} >↑</button>
          <span className="center">
            {voteCount}
          </span>
          <button className={downSelected ? "post - selected" : "post"} onClick={toggleDownSelected} >↓</button>
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
