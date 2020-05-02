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

  const [upVoteSelected, setUpVoteSelectedFunction] = React.useState(false)

  const [downVoteSelected, setDownVoteSelectedFunction] = React.useState(false)

  const [postVotes, setPostVotes] = React.useState(props.post.upVotes-props.post.downVotes)


  const setUpVoteSelected = () => {
    if (upVoteSelected) { // case where it is initally selected
      // unselect and decrement upVotes
      setUpVoteSelectedFunction(!upVoteSelected)
      props.decreaseUpVotes()
      props.post.upVotes--
    } else { // case where it is not initially selected
      if (downVoteSelected) {
        // fix the downvote to unselected
        setDownVoteSelectedFunction(false)
        props.decreaseDownVotes()
        props.post.downVotes--
      }
      // select and increment upVotes
      setUpVoteSelectedFunction(!upVoteSelected)
      props.increaseUpVotes()
      props.post.upVotes++
    }
  }

  const setDownVoteSelected = () => {
    if (downVoteSelected) { // case where downVote is already selected
      // unselect and decrement downVotes
      setDownVoteSelectedFunction(!downVoteSelected)
      props.decreaseDownVotes()
      props.post.downVotes--
    } else { // case where it is not already selected
      if (upVoteSelected) {
        // fix the upVote button to unselected
        setUpVoteSelectedFunction(false)
        props.decreaseUpVotes()
        props.post.upVotes--
      }
      // select and increment downVotes
      setDownVoteSelectedFunction(!downVoteSelected)
      props.increaseDownVotes()
      props.post.downVotes++
    }
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={setUpVoteSelected} className={upVoteSelected ? "upButton" : ""}>↑</button>
          <span className={upVoteSelected ? "upVoteSelected" : downVoteSelected ? "downVoteSelected" : "center"}>
            {props.post.upVotes-props.post.downVotes}
          </span>
          <button onClick={setDownVoteSelected} className={downVoteSelected ? "downButton" : ""}>↓</button>
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
