import React, { Component } from 'react';
import axios from 'axios';

class IdeaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body,
    }
  }

  handleInput = (e) => {
    this.props.resetNotification();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBlur = () => {
    const editedIdea = {
      title: this.state.title,
      body: this.state.body
    }

    axios.put(
      `http://localhost:3001/api/v1/ideas/${this.props.idea.id}`,
      {
        idea: editedIdea, 
      }).then( response => {
        console.log("PUT response: ");
        console.log(response);
        // after saving the response to API,
        // must update IdeasComponent so it knows that the ideas have been updated
        this.props.updateIdea(response.data);
      }).catch( error => {
        console.log(error); 
      }
    )
  }

  // Renders the input form
  // onChange = handleInput --> sets the form field values to specific state values
  // onBlur   = when the form loses focus, save the form. 
  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput}
            ref={this.props.titleRef} />
          <textarea className='input' name="body"
            placeholder='Describe your idea' value={this.state.body}
            onChange={this.handleInput} >
          </textarea>
        </form>
      </div>
    );
  }
}

export default IdeaForm;