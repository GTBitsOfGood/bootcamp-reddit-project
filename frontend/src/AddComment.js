import React, { Component } from 'react'
import './AddPost.css'

const AddComment = props => {
  const [author, setAuthor] = React.useState('')
  const [commentText, setCommentText] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const updateField = event => {
    const { name, value } = event.target
    if (name === 'author') setAuthor(value)
    if (name === 'text') setCommentText(value)
  }

  const submit = () => {
    if (author === '') setErrorText('Please provide an author!')
    else if (commentText === '') setErrorText('Please provide comment text!')
    else {
      setAuthor('')
      setCommentText('')
      setErrorText('')
      props.onSubmit({ author, text: commentText })
    }
  }

  return (
    <section>
      <br />
      <span>
        Author: <input name="author" value={author} onChange={updateField} />
      </span>
      <p>Your reply...</p>
      <textarea
        rows="5"
        cols="50"
        name="text"
        value={commentText}
        onChange={updateField}
      />
      <br />
      <button onClick={submit}>Submit</button>
      <button onClick={props.onCancel}>Cancel</button>
      {errorText && <span className="error">{errorText}</span>}
    </section>
  )
}

export default AddComment
