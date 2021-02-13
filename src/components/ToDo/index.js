import React from 'react';
import Task from '../Task/index';
import AddTask from '../AddTask/index';

class ToDo extends React.Component {
  state = {
    tasks: ['Task 1 ', 'Task 2'],
    inputValue: ''
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleReset = () => {
    this.setState({
      inputValue: ''
    })
  }
  render() {
    const { tasks, inputValue } = this.state;
    const Tasks = this.state.tasks.map((task, index) => {
    return (
      <Task task={task} key={index} />
    )
  })

    return (
      <div>
        <h1>ToDo Component</h1>
        <AddTask />
        {/*<div>
          <input
              type="text"
              placeholder="Add Task"
              onChange={this.handleChange}
              value={inputValue}
            />
            <button>Add</button>
            <button
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div> */
        }
      
        <div className="task_wrapper">
          {!tasks.length && <div>Tasks is Empty</div>}
          {Tasks}
        </div>
      </div>
    )
  }
};

export default ToDo;