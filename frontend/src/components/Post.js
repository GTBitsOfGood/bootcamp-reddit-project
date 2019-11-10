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

  const originalVotes = props.post.upVotes - props.post.downVotes;
  const [votes, toggle] = React.useState(originalVotes);


  const clickUpVote = () => {
    if (votes>originalVotes) {
      toggle(originalVotes);
      props.updateUpVote(false);
    } else {
      if (votes<originalVotes) {
        props.updateDownVote(false);
      }
      toggle(originalVotes+1);
      props.updateUpVote(true);
    }
  }
  const clickDownVote = () => {
    if (votes<originalVotes) {
      toggle(originalVotes);
      props.updateDownVote(false);
    }
    else { 
      if (votes>originalVotes) {
        props.updateUpVote(false);
      }
      toggle(originalVotes-1);
      props.updateDownVote(true);
    }
  }

  const updateVoteColor = () => {
    if (votes>originalVotes) return 'orange';
    else if (votes<originalVotes) return 'blue';
    else return 'center';
  }

  return (
    <>
      <section className="post">
        <div className="arrows">
          <button onClick={clickUpVote}>↑</button>
          <span className= {updateVoteColor()}>
            {votes}
          </span>
          <button onClick={clickDownVote}>↓</button>
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
