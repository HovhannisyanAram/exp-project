import React from 'react';
import Task from '../../Task';
import Confirm from '../../Confirm'
import { connect } from 'react-redux';
import Preloader from '../../Preloader';
import TaskActions from '../../TaskActions';
import dateFormatter from '../../../helpers/date';
import actionTypes from '../../../redux/actionTypes';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from './task.module.css';
class ToDo extends React.PureComponent {
  
  handleSubmit = (formData) => {
    if (!!!formData.title.trim() || !!!formData.description.trim()) return;
    formData.date = dateFormatter(formData.date);
    this.props.toggleLoading(true);
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
      };
      this.props.addTask(data);
      this.props.isOpenAddTaskModal && this.toggleOpenAddTaskModal();
    })
    .catch(error => {
      console.log('error', error)
    })
    .finally(() => {
      this.props.toggleLoading(false)
    })
  };

  handleDeleteOneTask = (_id) => {
    this.props.toggleLoading(true);
    fetch(`http://localhost:3001/task/` + _id, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      }
      this.props.deleteOneTask(_id)
    })
    .catch(error => {
      console.error("Delete task request Error", error);
    })
    .finally(() => {
      this.props.toggleLoading(false)
    })
  };

  removeSelectedTasks = () => {
    this.props.toggleLoading(true);
    fetch("http://localhost:3001/task", {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      }
      this.props.deleteCheckedTasks()
    })
    .catch(error => {
      console.error("Delete any task request error", error)
    })
    .finally(() => {
      this.props.toggleLoading(false);
    })
  };

  handleEditTask = (editTask) => {
    this.props.toggleLoading(true);
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
      this.props.editTask(data);
      this.props.editableTask && this.props.setOrRemoveEditableTask();
    })
    .catch(error => {
      console.error("Edit task request error", error);
    })
    .finally(() => {
      this.props.toggleLoading(false)
    })
  };

  // toggleOpenAddTaskModal = () => {
  //   this.setState({
  //     isOpenAddTaskModal: !this.state.isOpenAddTaskModal,
  //   })
  // };

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
      this.props.setTasks(data);
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
      // state
      tasks,
      loading,
      removeTasks,
      isAllChecked,
      editableTask,
      isConfirmModal,
      isOpenAddTaskModal,
      // functions
      toggleCheckTask,
      toggleCheckAllTasks,
      toggleOpenAddTaskModal,
      toggleOpenConfirmModal,
      setOrRemoveEditableTask
    } = this.props;

    const Tasks = tasks.map(task => {
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
          handleSetEditTask={setOrRemoveEditableTask}
          handleDeleteOneTask={this.handleDeleteOneTask}
          toggleSetRemoveTaskIds={toggleCheckTask}
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
                variant="primary"
                onClick={toggleOpenAddTaskModal}
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
                onClick={toggleOpenConfirmModal}
                disabled={!!!removeTasks.size}
              >
                Remove Selected
              </Button>
              <Button
                variant="info"
                className="ml-4"
                onClick={toggleCheckAllTasks}
                disabled={!!!tasks.length}
              >
                {isAllChecked ? "Reset Selects" : "Select All"}
              </Button>
            </Col>
          </Row>
        </Container>
        {
          isConfirmModal && <Confirm
            onHide={toggleOpenConfirmModal}
            onSubmit={this.removeSelectedTasks}
            message={`Do you want to delete ${removeTasks.size} task?`}
          />
        }
        {
          editableTask && <TaskActions
            editableTask={editableTask}
            onHide={setOrRemoveEditableTask}
            onSubmit={this.handleEditTask}
            />
        }
        {
          isOpenAddTaskModal && <TaskActions
            onHide={toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
          />
        }
        {
          loading && <Preloader />
        }
      </>
    )
  }
};

const mapStateToProps = (state) => {
  const {
    tasks,
    loading,
    removeTasks,
    isAllChecked,
    editableTask,
    isConfirmModal,
    isOpenAddTaskModal,
    toggleOpenAddTaskModal
  } = state.todoState;
  return {
    tasks,
    loading,
    removeTasks,
    isAllChecked,
    editableTask,
    isConfirmModal,
    isOpenAddTaskModal,
    toggleOpenAddTaskModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTasks: (data) => {
      dispatch({ type: actionTypes.SET_TASKS, data })
    },
    toggleLoading: (isLoading) => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading })
    },
    deleteOneTask: (_id) => {
      dispatch({ type: actionTypes.DELETE_ONE_TASK, _id })
    },
    addTask: (data) => {
      dispatch({ type: actionTypes.ADD_TASK, data })
    },
    editTask: (data) => {
      dispatch({ type: actionTypes.EDIT_TASK, data })
    },
    toggleCheckTask: (_id) => {
      dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id })
    },
    deleteCheckedTasks: () => {
      dispatch({ type: actionTypes.DELETE_CHECKED_TASKS })
    },
    toggleCheckAllTasks: () => {
      dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS })
    },
    toggleOpenAddTaskModal: () => {
      dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL })      
    },
    toggleOpenConfirmModal: () => {
      dispatch({ type: actionTypes.TOGGLE_OPEN_CONFIRM_MODAL })      
    },
    setOrRemoveEditableTask: (task = null) => {
      dispatch({ type: actionTypes.SET_OR_REMOVE_EDITABLE_TASK, task })
    }
  }
};

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo)

export default TodoProvider;