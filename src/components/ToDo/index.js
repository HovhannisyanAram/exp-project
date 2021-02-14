import React from 'react';
import Task from '../Task/index';
import AddTask from '../AddTask/index';

import styles from './task.module.css';
class ToDo extends React.Component {
  state = {
    tasks: ['Task 1 ', 'Task 2'],
  }

  handleSubmit = (value) => {
    if (!value) return;
    const tasks = [...this.state.tasks];
    tasks.push(value);
    this.setState({
        tasks
    });
}
  render() {
    const { tasks } = this.state;
    const Tasks = this.state.tasks.map((task, index) => {
    return (
      <Task
        task={task}
        key={index}
        active={index === 1}
        active2={index === 2}
      />
    )
  })

    return (
      <div>
        <h1>ToDo Component</h1>
        <AddTask handleSubmit={this.handleSubmit} />
        <div className="taskWrapper">
          {!tasks.length && <div>Tasks is Empty</div>}
          {Tasks}
        </div>
      </div>
    )
  }
};

export default ToDo;