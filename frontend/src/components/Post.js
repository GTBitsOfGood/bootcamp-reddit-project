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

  const [voteNum, setVoteNum] = React.useState(0)
  const [upvoted, setUpvoted] = React.useState(false)
  const [downvoted, setDownvoted] = React.useState(false)

  const toggleUpvote = () => {
    if (upvoted) {
      setVoteNum(voteNum - 1)
      props.decreaseUpvotes()
    } else if (!upvoted) {
      setVoteNum(voteNum + 1)
      props.increaseUpvotes()
    }
    if (downvoted) {
      setDownvoted(false)
      setVoteNum(voteNum + 2)
      props.decreaseDownvotes()
    }
    setUpvoted(!upvoted)
  }

  const toggleDownvote = () => {
    if (downvoted) {
      setVoteNum(voteNum + 1)
      props.decreaseDownvotes()
    } else if (!downvoted) {
      setVoteNum(voteNum - 1)
      props.increaseDownvotes()
    }
    if (upvoted) {
      setUpvoted(false)
      setVoteNum(voteNum - 2)
      props.decreaseUpvotes()
    }
    setDownvoted(!downvoted)
  }


  return (
    <>
      <section className="post">
        <div className="arrows">
          <button class={upvoted ? "upvote selected" : "upvote"} onClick={toggleUpvote}>↑</button>
          <span className="center">
            {voteNum}
          </span>
          <button class={downvoted ? "downvote selected" : "downvote"} onClick={toggleDownvote}>↓</button>
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
