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

  const [upvotes, setUpvotes] = React.useState(props.post.upVotes)
  const [downvotes, setDownvotes] = React.useState(props.post.downVotes)

  const [upvote, wasUpvoted] = React.useState(false)
  const [downvote, wasDownvoted] = React.useState(false)
  
  const Upvoted = () => {
    wasUpvoted(!upvote); 
    
    if (upvote) {
      setUpvotes(upvotes - 1);
      props.decrementUpvotes();
      
    }
    else if (downvote && !upvote)  {
      setUpvotes(upvotes + 1);
      setDownvotes(downvotes - 1);
      wasDownvoted(false);  
      props.incrementUpvotes();
      props.decrementDownvotes();
      
    }
    else {
      setUpvotes(upvotes + 1);
      props.incrementUpvotes();
    } 
  }

  
  const downvoted = () => {
    wasDownvoted(!downvote);
    if (downvote) {
      setDownvotes(downvotes - 1);
      props.decrementDownvotes();
    }
    else if (!downvote && upvote) {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      wasUpvoted(false)
      props.decrementUpvotes();
      props.incrementDownvotes();
    }
    else {
      setDownvotes(downvotes + 1);
      props.incrementDownvotes();
    } 
    
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button class = {upvote ? "upvote" : "arrows"} onClick = { () => {Upvoted();}}>↑</button>
          <span className="center">
            {upvotes - downvotes}
          </span>
          <button class = {downvote ? "downvote" : "arrows"} onClick = { () => {downvoted();}}>↓</button>
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
