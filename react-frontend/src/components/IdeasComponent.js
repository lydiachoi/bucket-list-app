import React, { Component } from 'react';
import axios from 'axios';
import Idea from './Idea';
import IdeaForm from "./IdeaForm";
import update from 'immutability-helper';

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],           // by default there's no ideas in the array (until addNewIdea())
      editingIdeaId: null, // by default we aren't editing any idea
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
      "http://localhost:3001/api/v1/ideas",
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
      console.log("data id " + response.data.id);
    }).catch( function(error) {
      console.log(error); 
    })
  }

// maps each idea to either the idea form or the idea, depending on the id
  render() {
    return (
      <div>
        <button className="newIdeaButton" onClick={this.addNewIdea}>
          New Idea
        </button>
        <div>
          {this.state.ideas.map((idea) => { 
            console.log(this.state.editingIdeaId + " " + idea.id);
            if (this.state.editingIdeaId === idea.id) {
              console.log("gets here");
              return ( <IdeaForm idea={idea} key={idea.id} /> )
            } else {
              console.log("only gets here");
              return ( <Idea idea={idea} key={idea.id} /> )
            }
          })}
        </div>
      </div>
    );
  }
}

export default IdeasContainer;