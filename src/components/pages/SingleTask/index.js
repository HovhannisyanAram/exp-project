import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../../Preloader';
import { Button } from 'react-bootstrap';
import TaskActions from '../../TaskActions';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import {
  editTaskThunk,
  setSingleTaskThunk, 
  deleteOneTaskThunk,
  // toggleEditModalOfSingle
} from '../../../redux/actions'

const SingleTask = (props) => {
  
  // Effects
  const { id } = props.match.params;
  const { history, setSingleTask } = props;
  useEffect(() => {
    setSingleTask(id, history)
  },[id, history, setSingleTask]);
  
  const {
    // state
    loading,
    singleTask,
    isEditModal,
  } = props;
    
    if(!singleTask) return <Preloader />;
      
    return (
      <>
        <div className={styles.singleTask}>
          <div className={styles.singleTaskDiv}>
            <button
              className={styles.button}
              onClick={() => props.history.goBack()}
            >
              <span>
                Go Back
              </span>
            </button>
          </div>
          <div className={styles.task}>
            <div>
            </div>
            <h2>{singleTask.title}</h2>
            <p>
              {singleTask.description}
            </p>
            <p>
              Date: <span className={styles.date}>{dateFormatter(singleTask.date)}</span>
            </p>
            <p>
              Created At: <span className={styles.date}>{dateFormatter(singleTask.created_at)}</span>
            </p>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => props.deleteTask(singleTask._id, history)}
              >
                Delete
              </Button>
              <Button
                className="ml-2"
                variant="outline-warning"
                onClick={props.toggleEditModal}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
        {
          isEditModal && <TaskActions
            editableTask={singleTask}
            onHide={props.toggleEditModal}
            onSubmit={props.editTask}
          />
        }
        {
          loading && <Preloader />
        }
      </>
    );
};

  const mapStateToProps = (state) => {
    const { singleTask, isEditModal } = state.singleTaskState;
    return {
      singleTask,
      isEditModal,
      loading: state.todoState.loading
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setSingleTask: (id, history) => dispatch(setSingleTaskThunk(id, history)),
      deleteTask: (_id, history) => dispatch(deleteOneTaskThunk(_id, history)),
      editTask: (singleTask, page) => dispatch(editTaskThunk(singleTask, page)),
      toggleEditModal: () => dispatch({ type: "TOGGLE_EDIT_MODAL" }),
    } 
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);