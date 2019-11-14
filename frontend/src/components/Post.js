import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import './Post.css'


const Post = props => {
  const [replyOpen, setReplyOpen] = React.useState(false)
  const originalVotes = props.post.upVotes - props.post.downVotes 
  const [newVotes,setNewVotes] = React.useState(originalVotes)

  const toggleReply = () => setReplyOpen(!replyOpen)

  
  const upvote = () => {
      if (newVotes > originalVotes) {
          setNewVotes(originalVotes)
      } else {
          setNewVotes(originalVotes + 1)
          props.onUpvote(true)
      }
    }
    
  const downvote = () => {
      if (newVotes < originalVotes) {
          setNewVotes(originalVotes)
     } else {
          setNewVotes(originalVotes - 1)
          props.onDownvote(true)
     }
   }     

  const saveComment = commentData => {
    setReplyOpen(false)
    props.onComment(props.post._id, commentData)
  }

  // function Counter (){
  //   const [upvote_clicks, set_upvote_clicks] = React.useState(originalVotes)
  //   const [downvote_clicks, set_downvote_clicks] = React.useState(originalVotes)

  //   const upvote = () => {
  //     if (newVotes == 1){
  //       set_upvote_clicks(upvotes_clicks+1)
  //     }
  //     else {
  //       set_upvote_clicks(upvotes_clicks-1)
  //     }
  //   }
  //   const downvote = () => {
  //     if (newVotes == -1){
  //       set_downvote_clicks(downvotes_click+1)
  //     }
  //     else{
  //       set_downvote_clicks(downvotes_click-1)
  //     }
  //   }
  // }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={upvote}>↑</button>
          <span className="center">
            {newVotes}
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
