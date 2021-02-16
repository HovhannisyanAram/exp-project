import React from 'react';
import Task from '../Task/index';
import AddTask from '../AddTask/index';
import idGenerator from '../../helpers/idGenerator';
import {Container, Row, Col} from 'react-bootstrap';

import styles from './task.module.css';
class ToDo extends React.Component {
  state = {
    tasks: ['Task 1 ', 'Task 2', 'Task 3'],
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
      <Col
        key={idGenerator()}
        className="d-flex justify-content-center mt-3"
        xs={12}
        md={6}
        xl={4}
      >
        <Task
          task={task}
          active={index === 1}
          active2={index === 2}
        />
      </Col>
    )
  })

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>ToDo Component</h1>
              <AddTask
                handleSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
          <Row>
            <div className={styles.tasksWrapper}>
              {!tasks.length && <div>Tasks is Empty</div>}
              {Tasks}
            </div>
          </Row>
        </Container>
      </div>
    )
  }
};

export default ToDo;