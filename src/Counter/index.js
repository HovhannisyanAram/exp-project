import React, { Component } from 'react';
import Result from './Result/index';
import Action from './Action/index';


class Counter extends Component{

  state = {
    count: 0 ,
  };

  handlePlusCount = () => {
    this.setState({
      count: this.state.count + 1,
    })
  };

  handleMinusCount = () => {
    this.setState({
      count: this.state.count - 1,
    })
  };

  render() {
    return(
        <>
        <Result />
        <Action />
      </>
    )
  }
}

export default Counter;