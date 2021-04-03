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

import ReduxDemo from '../src/demo/Redux'

const page = [
  {
    path: "/",
    component: Todo
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/task/:id",
    component: SingleTask
  },
  {
    path: "/404",
    component: NotFound
  }
]
class App extends Component {
  render() {
    const pageRoutes = page.map((page, index) => {
      if(page.path === "/contact") {
        return(
        <Route
          key={index}
          path={page.path}
          exact
          render={(props) => {
            return(
              <ContactContextProvider>
                {<page.component {...props} />}
              </ContactContextProvider>
            );
          }}
        />
        );
      };
      return(
        <Route
          key={index}
          path={page.path}
          component={page.component}
          exact
        />
      )
    })
    return (
        <div className="App">
          {/* <Navbar />
          <Switch>
            {pageRoutes}
            <Redirect to="/404" />
          </Switch> */}
          <ReduxDemo />
        </div>
    );
  };
};

export default App;
