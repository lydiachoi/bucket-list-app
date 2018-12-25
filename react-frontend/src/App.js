import React, { Component } from 'react';
import './App.css';
import IdeasComponent  from "./components/IdeasComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Lydia's Bucket List</h1>  
          <div>
            <IdeasComponent/>
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
