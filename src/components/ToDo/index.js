import React from 'react';
import Task from '../Task/index';
import AddTask from '../AddTask/index';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';



// import styles from './task.module.css';
class ToDo extends React.Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: 'AngularJs',
      },
      {
        _id: idGenerator(),
        title: 'React.js',
      },
      {
        _id: idGenerator(),
        title: 'Vue.Js'
      },
    ],
    removeTasks: [],
  }
  
  
  handleSubmit = (value) => {
    if (!value) return;
    const tasks = [...this.state.tasks];
    tasks.push({
      _id: idGenerator(),
      title: value,
    });
    this.setState({
      tasks
    });
  };

  handleDeleteOneTask = (id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(item => item._id !== id);
    this.setState({
      tasks,
    });
    // const idx = tasks.findIndex(item => item._id === id);
    // tasks.splice(idx, 1)
  };

  toggleSetRemoveTaskIds = (_id) => {
    let removeTasks = [...this.state.removeTasks];
    if(removeTasks.includes(_id)) {
      removeTasks = removeTasks.filter(id => id !== _id)
    } else {
      removeTasks.push(_id);
    };
  
    this.setState({
      removeTasks
    }); 
  };

  removeSelectedTasks = () => {
    let tasks = [...this.state.tasks];
    const removeTasks = [...this.state.removeTasks];
      tasks = tasks.filter(item => !removeTasks.includes(item._id))
    this.setState({
      tasks,
      removedTasks: [],
    })
  };
  render() {
    const { tasks, removeTasks } = this.state;
    const Tasks = this.state.tasks.map(task => {
    return (
      <Col
        key={task._id}
        className="d-flex justify-content-center mt-4"
        xs={12}
        md={6}
        xl={4}
      >
        <Task
          task={task}
          handleDeleteOneTask={this.handleDeleteOneTask}
          toggleSetRemoveTaskIds={this.toggleSetRemoveTaskIds}
          disabled={!!removeTasks.length}
        />
      </Col>
    )
  })

    return (
      <div>
        <Container>
          <Row className="mt-4">
            <Col>
              <h1>ToDo Component</h1>
              <AddTask
                handleSubmit={this.handleSubmit}
                disabled={!!removeTasks.length}
              />
            </Col>
          </Row>
          <Row className="mt-4">
              {!tasks.length && <div>Tasks is Empty</div>}
              {Tasks}
          </Row>
          <Row className="mt-5">
            <Col>
              <Button
                variant="danger"
                onClick={this.removeSelectedTasks}
                disabled={!!!removeTasks.length}
              >
                Remove Selected
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

export default ToDo;