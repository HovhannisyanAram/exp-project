import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';

import Todo from './components/pages/ToDo';
import About from './components/pages/About';
import NotFound from './components/NotFound';
import Contact from './components/pages/Contact';
import SingleTask from './components/pages/SingleTask';
import ContactContextProvider from './context/ContactPageContext';

const page = [
  {
    path: "/",
    Component: Todo
  },
  {
    path: "/contact",
    Component: Contact,
    Provider: ContactContextProvider
  },
  {
    path: "/about",
    Component: About
  },
  {
    path: "/task/:id",
    Component: SingleTask
  },
  {
    path: "/404",
    Component: NotFound
  }
]
class App extends Component {
  render() {
    const pageRoutes = page.map((page, index) => {
      const { Provider, Component } = page
      return(
        <Route
        key={index}
        path={page.path}
        render={(props) => {
          return(
            Provider ? <Provider>
            <Component {...props} />
            </Provider> : <Component {...props} />)
        }}
          exact
        />
        );
    })
    return (
        <div className="App">
          <Navbar />
          <Switch>
            {pageRoutes}
            <Redirect to="/404" />
          </Switch>
        </div>
    );
  };
};

export default App;
