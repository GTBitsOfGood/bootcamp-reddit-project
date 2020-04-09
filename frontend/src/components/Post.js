import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const toggleReply = () => setReplyOpen(!replyOpen)
  //console.log(toggleReply)

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }
  
  
  const [voteCount, setVoteCount] = React.useState(props.post.upVotes - props.post.downVotes)
  

  const [upVoteSelected, toggleUpVote] = React.useState(false)

  const upVote = () => {
    if (downVoteSelected === true) {
      toggleDownVote(!downVoteSelected)
      toggleUpVote(!upVoteSelected)
      setVoteCount(voteCount + 2)
      props.decrementDownVoteCount()
      props.incrementUpVoteCount()
      //downvotes-1
      //upvotes+1
      
    } else if (upVoteSelected === true) {
      toggleUpVote(!upVoteSelected)
      setVoteCount(voteCount - 1)
      props.decrementUpVoteCount()
      //upvote-1
      
    } else {
      toggleUpVote(!upVoteSelected)
      setVoteCount(voteCount + 1)
      props.incrementUpVoteCount()
      //upvotes+1
      
    }
  } 

  

  const [downVoteSelected, toggleDownVote] = React.useState(false)

  const downVote = () => {
    if (upVoteSelected === true) {
      toggleUpVote(!upVoteSelected)
      toggleDownVote(!downVoteSelected)
      setVoteCount(voteCount - 2)
      props.decrementUpVoteCount()
      props.incrementDownVoteCount()
      //upvotes-1
      //downvotes+
    } else if (downVoteSelected === true) {
      toggleDownVote(!downVoteSelected)
      setVoteCount(voteCount + 1)
      props.decrementDownVoteCount()
      //downvote-1
    } else {
      toggleDownVote(!downVoteSelected)
      setVoteCount(voteCount - 1)
      props.incrementDownVoteCount()
      //downvotes+1
    }
    
    
  }
  
  return (
    <>
      <section className="post">
        <div className="arrows">
          <button class={upVoteSelected ? "selected" : ""} onClick={upVote}>↑</button>
          <span className="center">
          {voteCount}
          </span>
          <button  class={downVoteSelected ? "selected" : ""} onClick={downVote}>↓</button>
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
