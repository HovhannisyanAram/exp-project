import React from 'react';
import Task from '../../Task';
import Confirm from '../../Confirm'
import Preloader from '../../Preloader';
import TaskActions from '../../TaskActions';
import dateFormatter from '../../../helpers/date';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from './task.module.css';
class ToDo extends React.PureComponent {
  state = {
    tasks: [],
    loading: false,
    editableTask: null,
    isAllChecked: false,
    isConfirmModal: false,
    removeTasks: new Set(),
    isOpenAddTaskModal: false
  }
  
  
  handleSubmit = (formData) => {
    if (!formData.title || !formData.description) return;
    formData.date = dateFormatter(formData.date);
    const tasks = [...this.state.tasks];
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      }
      tasks.push(data)
      this.setState({
        tasks
      });
    })
    .catch(error => {
      console.log('error', error)
    });
  };

  handleDeleteOneTask = (id) => {
    fetch(`http://localhost:3001/task/` + id, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      }
      let tasks = [...this.state.tasks];
      tasks = tasks.filter(item => item._id !== id);
      this.setState({
        tasks,
      });
    })
    .catch(error => {
      console.error("Delete task request Error", error);
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
    fetch("http://localhost:3001/task", {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      }
      let tasks = [...this.state.tasks];
      const { removeTasks } = this.state;
      tasks = tasks.filter(item => !removeTasks.has(item._id))
      this.setState({
        tasks,
        removedTasks: new Set(),
        isAllChecked: false,
      })
    });
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
    fetch('http://localhost:3001/task/' + editTask._id, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      };
      const tasks = [...this.state.tasks];
      const idx = tasks.findIndex(task => task._id === data._id);
      tasks[idx] = data;
      this.setState({
        tasks
      });
    })
    .catch(error => {
      console.error("Edit task request error", error);
    });
  };

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenAddTaskModal: !this.state.isOpenAddTaskModal,
    })
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
    fetch("http://localhost:3001/task")
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      };
      this.setState({
        tasks: data,
      })
    })
    .catch(error => {
      console.error("get Tasks request error", error);
    })
    .finally(
      this.setState({
        loading: false
      }),
    );
  };

  render() {
    const {
      tasks,
      loading,
      removeTasks,
      isAllChecked,
      editableTask,
      isConfirmModal,
      isOpenAddTaskModal,
    } = this.state;

    if(loading) return <Preloader />;

    const Tasks = this.state.tasks.map(task => {
    return (
      <Col
        md={6}
        xl={4}
        xs={12}
        key={task._id}
        className="d-flex justify-content-center mt-4"
      >
        <Task
          task={task}
          disabled={!!removeTasks.size}
          checked={removeTasks.has(task._id)}
          handleSetEditTask={this.handleSetEditTask}
          handleDeleteOneTask={this.handleDeleteOneTask}
          toggleSetRemoveTaskIds={this.toggleSetRemoveTaskIds}
        />
      </Col>
    )
  })

    return (
      <>
        <Container>
          <Row className="mt-4">
            <Col>
              <Button
                onClick={this.toggleOpenAddTaskModal}
                variant="primary"
              >
                Add task
              </Button>
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
                onClick={this.handleToggleOpenModal}
                disabled={!!!removeTasks.size}
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
          isConfirmModal && <Confirm
            onHide={this.handleToggleOpenModal}
            onSubmit={this.removeSelectedTasks}
            message={`Do you want to delete ${removeTasks.size} task?`}
          />
        }
        {
          editableTask && <TaskActions
            editableTask={editableTask}
            onHide={this.editableTaskNull}
            onSubmit={this.handleEditTask}
            />
        }
        {
          isOpenAddTaskModal && <TaskActions
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
          />
        }
      </>
    )
  }
};

export default ToDo;