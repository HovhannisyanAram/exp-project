import React from 'react';

class ToDo extends React.Component {
  state = {
    tasks: ['task1', 'task2', 'task3'],
  }

  render() {
    const Task = this.state.tasks.map((task, i) => {
      return(
        <p key={i} className={task}>{task}</p>
      )
    })

    return(
    <>
      <div>
        <h1>ToDo</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="some text"
        />
        <button>Add</button>
      </div>
      <div>
        {Task}
      </div>
    </>
    )
  };
};

export default ToDo;