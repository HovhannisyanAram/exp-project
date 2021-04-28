import React, { useEffect } from 'react';

import Task from '../../Task';
import Search from '../../Search';
import Confirm from '../../Confirm';
import { connect } from 'react-redux';
import Preloader from '../../Preloader';
import TaskActions from '../../TaskActions';
import 'react-toastify/dist/ReactToastify.css';
import dateFormatter from '../../../helpers/date';
import actionTypes from '../../../redux/actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  setTasksThunk,
  addTasksThunk, 
  editTaskThunk,
  deleteOneTaskThunk, 
  removeAnyTaskThunk,
  toggleActiveStatusThunk
} from '../../../redux/actions';




const Todo = (props) => {
  const {
    // state
    tasks,
    loading,
    removeTasks,
    isAllChecked,
    errorMessage,
    editableTask,
    isConfirmModal,
    successMessage,
    isOpenAddTaskModal,
    // functions
    setTasks,
    editTask,
    removeAnyTask,
    deleteOneTask,
    toggleCheckTask,
    toggleActiveTask,
    toggleCheckAllTasks,
    toggleOpenAddTaskModal,
    toggleOpenConfirmModal,
    setOrRemoveEditableTask
  } = props;
  
  const  handleSubmit = (formData) => {
    if (!!!formData.title.trim() || !!!formData.description.trim()) return;
    formData.date = dateFormatter(formData.date);
    props.addTask(formData);
  };

  useEffect(() => {
    setTasks()
  }, [setTasks]);

   useEffect(() => {
     errorMessage && toast.error(`🦄 ${errorMessage}`, {
     position: "bottom-center",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     });
  }, [errorMessage]);

  useEffect(() => {
    successMessage && toast.success(`🦄 ${successMessage}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }, [successMessage])

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
        handleDeleteOneTask={deleteOneTask}
        toggleActiveTask={toggleActiveTask}
        toggleSetRemoveTaskIds={toggleCheckTask}
        handleSetEditTask={setOrRemoveEditableTask}
      />
    </Col>
  )
  });

    return (
      <>
        <Container>
          <Row>
            <Col>
              <Search />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button
                variant="outline-info"
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
                variant="outline-danger"
                onClick={toggleOpenConfirmModal}
                disabled={!!!removeTasks.size}
              >
                Remove Selected
              </Button>
              <Button
                variant="outline-info"
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
            onSubmit={() => removeAnyTask(removeTasks)}
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
            onSubmit={handleSubmit}
          />
        }
        {
          loading && <Preloader />
        }
        {
          <ToastContainer />
        }
      </>
  );
}

const mapStateToProps = (state) => {
  const {
    tasks,
    loading,
    removeTasks,
    isAllChecked,
    editableTask,
    errorMessage,
    successMessage,
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
    errorMessage,
    isConfirmModal,
    successMessage,
    isOpenAddTaskModal,
    toggleOpenAddTaskModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Thunks
    setTasks: () => dispatch(setTasksThunk()),
    addTask: (formData) => dispatch(addTasksThunk(formData)),
    deleteOneTask: (_id) => dispatch(deleteOneTaskThunk(_id)),
    editTask: (editTask) => dispatch(editTaskThunk(editTask)),
    toggleActiveTask: (task) => dispatch(toggleActiveStatusThunk(task)),
    removeAnyTask: (removeTasks) => dispatch(removeAnyTaskThunk(removeTasks)),
    // Actions
    toggleCheckTask: (_id) => {dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id })},
    toggleCheckAllTasks: () => {dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS })},
    toggleOpenConfirmModal: () => {dispatch({ type: actionTypes.TOGGLE_OPEN_CONFIRM_MODAL })},
    toggleOpenAddTaskModal: () => {dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL })},
    setOrRemoveEditableTask: (task = null) => {dispatch({ type: actionTypes.SET_OR_REMOVE_EDITABLE_TASK, task })},
  }
};

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(Todo);

export default TodoProvider;