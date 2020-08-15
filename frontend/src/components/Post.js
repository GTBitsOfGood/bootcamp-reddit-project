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
  const [voteNum, voteUpdate] = React.useState(0);
  const [upvote, buttonup] = React.useState(false);
  const [downvote, buttondown] = React.useState(false);

  const upVote = () => {
    if (downvote) {
      buttondown(false);
      props.decreaseUp();
    }
    if (upvote) {
      buttonup(false);
      voteUpdate(voteNum + 1);
      props.increaseUp();
    }
    else {
      buttonup(true);
      voteUpdate(voteNum + 1);
      props.increaseUp();
    }
    
  }
  const downVote = () => {
    if (upvote) {
      buttonup(false);
      props.decreaseDown();
    }
    if (downvote) {
      buttondown(true);
      voteUpdate(voteNum - 1);
      props.increaseDown();
    }
    else {
      buttondown(true);
      voteUpdate(voteNum -1);
      props.increaseDown();
    }
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick ={upVote}>↑</button>
          <span className="center">
            {voteNum}
          </span>
          <button onClick = {downVote}>↓</button>
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
