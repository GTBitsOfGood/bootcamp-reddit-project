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

  const [upButton, setUpButton] = React.useState(false);

  const  onUp = () => {
    setUpButton(!upButton);
    if(upButton==false){
      props.post.upVotes +=1;
    
   if (downButton==true) {
     props.post.downVotes -= 1;
    setDownButton(!downButton);
   }
    }
    else{
      props.post.upVotes -= 1;
    }
  }
  const [downButton, setDownButton] = React.useState(false);

  const onDown = () => {
    setDownButton(!downButton);
    if (downButton == false) {
      props.post.downVotes += 1;
      
      if (upButton == true) {
        props.post.upVotes -= 1;
        setUpButton(!upButton);
      }
    } else {
      props.post.downVotes -= 1;
    }
  };

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button className={upButton ? "upVoted" : "center"} onClick={onUp}>
            ↑
          </button>
          <span className={upButton ? "upVoted":downButton ? "downVoted" : "center"}>
            {props.post.upVotes - props.post.downVotes}
          </span>
          <button
            className={downButton ? "downVoted" : "center"}
            onClick={onDown}
          >
            ↓
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
        {props.post.comments.map((com) => (
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
  );
}

export default Post
