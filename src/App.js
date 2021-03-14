import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';

import Todo from './components/pages/ToDo';
import Contact from './components/pages/Contact';
import About from './components/pages/About'
class App extends Component {

  render() {
    return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={Todo} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/about" component={About} exact />
            <Redirect to="/" />
          </Switch>
        </div>
    );
  };
};

export default App;
