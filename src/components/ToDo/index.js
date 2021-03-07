import React from 'react';
import Task from '../Task';
import AddTask from '../AddTask';
import Confirm from '../Confirm'
import EditTaskModal from '../EditTaskModal'; 
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from './task.module.css';
class ToDo extends React.PureComponent {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: 'AngularJs',
        description: 'description of AngularJs'
      },
      {
        _id: idGenerator(),
        title: 'React.js',
        description: 'description of React.js'
      },
      {
        _id: idGenerator(),
        title: 'Vue.Js',
        description: 'description of Vue.js'
      },
    ],
    removeTasks: new Set(),
    isAllChecked: false,
    isConfirmModal: false,
    editableTask: null,
  }
  
  
  handleSubmit = (formData) => {
    if (!formData.title || !formData.description) return;
    const tasks = [...this.state.tasks];
    tasks.push({
      _id: idGenerator(),
      title: formData.title,
      description: formData.description,
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
  };

  toggleSetRemoveTaskIds = (_id) => {
    let removeTasks = new Set(this.state.removeTasks);
    if(removeTasks.has(_id)) {
      removeTasks.delete(_id)
    } else {
      removeTasks.add(_id);
    };
  
    this.setState({
      removeTasks
    }); 
  };

  removeSelectedTasks = () => {
    let tasks = [...this.state.tasks];
    const { removeTasks } = this.state;
      tasks = tasks.filter(item => !removeTasks.has(item._id))
    this.setState({
      tasks,
      removedTasks: new Set(),
    })
  };

  handleToggleCheckAll = () => {
    const { tasks, isAllChecked } = this.state;
    let removeTasks = new Set();
    if(!isAllChecked) {
      removeTasks = new Set(this.state.removeTasks);
      tasks.forEach(task => {
        removeTasks.add(task._id)
      })
    };
    this.setState({
      removeTasks,
      isAllChecked: !isAllChecked,
    });
  };

  handleToggleOpenModal = () => {
    this.setState({
      isConfirmModal: !this.state.isConfirmModal,
    })
  };

  handleSetEditTask = (task) => {
    this.setState({
      editableTask: task,
    });
  };

  editableTaskNull = () => {
    this.setState({
      editableTask: null,
    });
  };

  handleEditTask = (editTask) => {
    const tasks = [...this.state.tasks];
    const idx = tasks.findIndex(task => task._id === editTask._id);
    tasks[idx] = editTask;
    this.setState({
      tasks
    });

  }

  render() {
    const {
      tasks,
      removeTasks,
      isAllChecked,
      isConfirmModal,
      editableTask
    } = this.state;
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
          disabled={!!removeTasks.size}
          checked={removeTasks.has(task._id)}
          handleSetEditTask={this.handleSetEditTask}
        />
      </Col>
    )
  })

    return (
      <>
        <Container>
          <Row className="mt-4">
            <Col>
              <h1>ToDo Component</h1>
              <AddTask
                handleSubmit={this.handleSubmit}
                disabled={!!removeTasks.size}
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
                // onClick={this.removeSelectedTasks}
                onClick={this.handleToggleOpenModal}
                disabled={!!!removeTasks.size || !!!tasks.length}
              >
                Remove Selected
              </Button>
              <Button
                variant="info"
                className="ml-4"
                onClick={this.handleToggleCheckAll}
                disabled={!!!tasks.length}
              >
                {isAllChecked ? "Reset Selects" : "Select All"}
              </Button>
            </Col>
          </Row>
        </Container>
        {
          isConfirmModal
          &&
          <Confirm
            onHide={this.handleToggleOpenModal}
            onSubmit={this.removeSelectedTasks}
            message={`Do you want to delete ${removeTasks.size} task?`}
          />
        }
        {
          editableTask
          &&
          <EditTaskModal
            editableTask={editableTask}
            onHide={this.editableTaskNull}
            onSubmit={this.handleEditTask}
            />
        }
      </>
    )
  }
};

export default ToDo;