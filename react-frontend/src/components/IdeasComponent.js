import React, { Component } from 'react';
import axios from 'axios';
import Idea from './Idea';
import IdeaForm from "./IdeaForm";
import update from 'immutability-helper';

class IdeasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],           // by default there's no ideas in the array (until addNewIdea())
      editingIdeaId: null, // by default we aren't editing any idea
      notification: "", 
    }
  }

  // get the ideas, log it and set the state
  componentDidMount() {
    axios.get("http://localhost:3001/api/v1/ideas.json")
      .then( (response) => {
        console.log(response);
        this.setState({ideas: response.data})
      }).catch ( function(error) {
        console.log(error);
      })
  }

  addNewIdea = () => {
    axios.post(
      `http://localhost:3001/api/v1/ideas`,
      { idea:
        { 
          title: "", 
          body: "", 
        }
      }
    ).then( response => {
      console.log(response);
      // insert our new idea at the beginning of the array of ideas
      const splicedIdeas = update( this.state.ideas, {
        $splice: [[0, 0, response.data]]
      });
      // sets state to new ideas list with added idea and we want to edit it immediately 
      this.setState({
        ideas: splicedIdeas,
        editingIdeaId: response.data.id, // sets the response id to the value of state.editingIdeaId
      });
    }).catch( function(error) {
      console.log(error); 
    })
  }

  deleteIdea = (id) => {
    axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
    .then(response => {
      const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
      const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]})
      this.setState({ideas: ideas})
    })
    .catch(error => console.log(error))
  }

  // this gets called by ideaForm when the onBlurring happens and API is updated
  updateIdea = (idea) => {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    const ideas = update(this.state.ideas, {
      [ideaIndex]: { $set: idea }
    })
    this.setState({
      ideas: ideas,
      notification: "All changes saved"
      });
  }

  resetNotification = () => { this.setState({notification: ""})  }

  // passed title.focus to setState inside a callback as a second argument
  // because setState doesn't always update the component
  // by passing focus call in a callback - ensure that it's only called after the component has been updated. 
  enableEditing = (id) => {
    this.setState({editingIdeaId: id}, () => { this.title.focus() })
  }

  // maps each idea to either the idea form or the idea, depending on the id
  render() {
    return (
      <div>
        <button className="newIdeaButton" onClick={this.addNewIdea}> New Idea </button>
        <span className="notification" > { this.state.notification } </span>
        <div>
          {this.state.ideas.map((idea) => {
            if(this.state.editingIdeaId === idea.id) {
              return(<IdeaForm idea={idea} key={idea.id}
                        updateIdea={this.updateIdea}
                        titleRef= {input => this.title = input}
                        resetNotification={this.resetNotification} />)
            } else {
              return (<Idea idea={idea} key={idea.id} 
                        onClick={this.enableEditing}
                        onDelete={this.deleteIdea} />)
            }
          })}
        </div>
      </div>
    );
  }
}

export default IdeasComponent;