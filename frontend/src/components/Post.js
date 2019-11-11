import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'

const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)

  const toggleReply = () => setReplyOpen(!replyOpen)

  const origVotes = props.post.upVotes - props.post.downVotes;
  const [votes, setVotes] = React.useState(origVotes)

  const upvote = () => {
    if (votes == origVotes || votes < origVotes) { // post hasn't been upvoted yet
      setVotes(origVotes + 1)
    } else { // post has already been upvoted; reset it to original votes
      setVotes(origVotes)
    }
  }

  const downvote = () => {
    if (votes == origVotes || votes > origVotes) { // post hasn't been downvoted yet
      setVotes(origVotes - 1)
    } else { // post has already been downvoted
      setVotes(origVotes)
    }
  }
  
  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }
  
  // add onClick to two arrow buttons
  // changed props.post.upVotes - props.post.downVotes to votes variable
  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={upvote}>↑</button>
          <span className="center">
            {votes}
          </span>
          <button onClick={downvote}>↓</button>
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
