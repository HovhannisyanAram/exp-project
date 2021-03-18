import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';

import Todo from './components/pages/ToDo';
import About from './components/pages/About';
import NotFound from './components/NotFound';
import Contact from './components/pages/Contact';
import SingleTask from './components/pages/SingleTask';
class App extends Component {

  render() {
    return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={Todo} exact />
            <Route path="/about" component={About} exact />
            <Route path="/404" component={NotFound} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/task/:id" component={SingleTask} exact />
            <Redirect to="/404" />
          </Switch>
        </div>
    );
  };
};

export default App;
