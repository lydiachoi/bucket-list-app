import React, { Component } from 'react';
import axios from 'axios';
import Idea from './Idea';
import IdeaForm from "./IdeaForm";
import update from 'immutability-helper';

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: []
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
    ).then( (response) => {
      console.log(response);
      // insert our new idea at the beginning of the array of ideas
      const splicedIdeas = update( this.state.ideas, {
        $splice: [[0, 0, response.data]]
      });
      this.setState({ideas: splicedIdeas})
    }).catch( function(error) {
      console.log(error); 
    })
  }


  render() {
    return (
      <div>
        <button className="newIdeaButton" onClick={this.addNewIdea}>
          New Idea
        </button>
        {this.state.ideas.map((idea) => { 
        if (this.state.editIdeaID === idea.id) {
          return ( <IdeaForm idea={idea} key={idea.id} /> )
        }
        return ( <Idea idea={idea} key={idea.id} /> )
        })}
      </div>
    );
  }
}

export default IdeasContainer;