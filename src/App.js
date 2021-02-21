import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo/index';

class App extends Component {
  state = {
    counter: 0,
  };

  plusCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  render() {
    return (
        <div className="App">
          <ToDo test={true}/>
        </div>
    );
  };
};

export default App;
