import React, { Component } from 'react'
import './AddPost.css'

class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = { author: '', title: '', text: '', error: false }
  }

  updateField = event => {
    const { name, value } = event.target
    this.setState(state => (state[name] = value))
  }

  submit = _ => {
    const { author, title, text } = this.state
    if (author === '') {
      this.setState({ error: 'Please provide an author!' })
    } else if (title === '') {
      this.setState({ error: 'Please provide a title!' })
    } else if (text === '') {
      this.setState({ error: 'Please provide post text!' })
    } else {
      this.setState({ author: '', title: '', text: '', error: false })
      this.props.onSubmit({ author, title, text })
    }
  }
  render() {
    return (
      <div className="container">
        <div>
          <strong>Add New Post</strong>
        </div>
        <div className="flex">
          <div className="flex short">
            <p>Author: </p>
            <input
              name="author"
              value={this.state.author}
              onChange={this.updateField}
            />
          </div>
          <div className="flex short">
            <p>Title: </p>
            <input
              name="title"
              value={this.state.title}
              onChange={this.updateField}
            />
          </div>
          <div className="flex long">
            <p>Text: </p>
            <input
              name="text"
              value={this.state.text}
              onChange={this.updateField}
            />
          </div>
        </div>

        <div className="flex">
          <button onClick={this.submit}>Submit</button>
          {this.state.error && (
            <span className="error">Error: {this.state.error}</span>
          )}
        </div>
      </div>
    )
  }
}

export default AddPost
