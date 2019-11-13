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

  const originalVotes = props.post.upVotes - props.post.downVotes

  const [newVotes, setNewVotes] = React.useState(originalVotes)

  const clickUpVote = () => {
    setNewVotes(originalVotes+=1)
  }

  const clickDownVote = () => {
    setNewVotes(originalVotes-=1)
  }

  const notVoted = (newVotes===originalVotes)

  const upButtonSelected = (newVotes>originalVotes)

  const downButtonSelected = (newVotes<originalVotes)
  
  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={clickUpVote} onClick={updateCounter} class={upButtonSelected ? "" : "upvote"}>↑</button>
          <span className="center">
            {props.post.upVotes - props.post.downVotes}
          </span>
          <button onClick={clickDownVote} onClick={updateCounter1} class={downButtonSelected ? "" : "downvote"}>↓</button>
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
