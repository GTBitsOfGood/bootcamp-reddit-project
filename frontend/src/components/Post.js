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

  let [isUpvoted, setUpvoted] = React.useState(false)
  let [isDownvoted, setDownvoted] = React.useState(false)

  const updateUpvotes = () => {
    /*
    CASES WHEN UPVOTE BUTTON IS PRESSED
    Case 1: user did not upvote, did not downvote
    Case 2: user did not upvote, did downvote
    Case 3: user did upvote, did not downvote
    */
    if (!isUpvoted && !isDownvoted) {
      props.post.upVotes += 1
      props.increaseUpvotes()
      setUpvoted(true)
    } else if (!isUpvoted && isDownvoted) {
      props.post.upVotes += 1
      props.increaseUpvotes()
      setUpvoted(true)
      props.post.downVotes -= 1
      props.decreaseDownvotes()
      setDownvoted(false)
    } else {
      props.post.upVotes -= 1
      props.decreaseUpvotes()
      setUpvoted(false)
    }
  }

  const updateDownvotes = () => {
    /*
    CASES WHEN DOWNVOTE BUTTON IS PRESSED
    Case 1: user did not upvote, did not downvote
    Case 2: user did not upvote, did downvote
    Case 3: user did upvote, did not downvote
    */
    if (!isUpvoted && !isDownvoted) {
      props.post.downVotes += 1
      props.increaseDownvotes()
      setDownvoted(true)
    } else if (!isUpvoted && isDownvoted) {
      props.post.downVotes -= 1
      props.decreaseDownvotes()
      setDownvoted(false)
    } else {
      props.post.upVotes -= 1
      props.decreaseUpvotes()
      setUpvoted(false)
      props.post.downVotes += 1
      props.increaseDownvotes()
      setDownvoted(true)
    }
  }


  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={updateUpvotes}>
            <div id={isUpvoted ? "triangle-up-active" : "triangle-up-inactive"}></div>
          </button>
          <span className="center">
            {props.post.upVotes - props.post.downVotes}
          </span>
          <button onClick={updateDownvotes}>
            <div id={isDownvoted ? "triangle-down-active" : "triangle-down-inactive"}></div>
          </button>
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
