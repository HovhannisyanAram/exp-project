import React from 'react';
import Task from '../../Task';
import Confirm from '../../Confirm'
import { connect } from 'react-redux';
import Preloader from '../../Preloader';
import TaskActions from '../../TaskActions';
import dateFormatter from '../../../helpers/date';
import actionTypes from '../../../redux/actionTypes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  setTasksThunk, 
  addTasksThunk, 
  deleteOneTaskThunk, 
  editTaskThunk,
  removeAnyTaskThunk,
} from '../../../redux/actions';
class ToDo extends React.PureComponent {
  
  handleSubmit = (formData) => {
    if (!!!formData.title.trim() || !!!formData.description.trim()) return;
    formData.date = dateFormatter(formData.date);
    this.props.addTask(formData);
  };

  componentDidMount() {
    this.props.setTasks();
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
      editTask,
      removeAnyTask,
      deleteOneTask,
      toggleCheckTask,
      toggleCheckAllTasks,
      toggleOpenAddTaskModal,
      toggleOpenConfirmModal,
      setOrRemoveEditableTask,
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
          handleDeleteOneTask={deleteOneTask}
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
            onSubmit={removeAnyTask}
            message={`Do you want to delete ${removeTasks.size} task?`}
          />
        }
        {
          editableTask && <TaskActions
            editableTask={editableTask}
            onHide={setOrRemoveEditableTask}
            onSubmit={editTask}
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
    setTasks: () => dispatch(setTasksThunk()),
    addTask: (formData) => dispatch(addTasksThunk(formData)),
    deleteOneTask: (_id) => dispatch(deleteOneTaskThunk(_id)),
    editTask: (editTask) => dispatch(editTaskThunk(editTask)),
    removeAnyTask: () => dispatch(removeAnyTaskThunk()),

    toggleLoading: (isLoading) => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading })
    },
    toggleCheckTask: (_id) => {
      dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id })
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
    },
  }
};

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo)

export default TodoProvider;