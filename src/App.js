import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo/index';
import image from './assets/images/Без названия';

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
          <img src={image} alt="person" />
          <ToDo />
        </div>
    );
  };
};

export default App;
