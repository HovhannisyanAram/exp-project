import React, { useReducer, useEffect, useCallback } from 'react';
import Preloader from '../../Preloader';
import { Button } from 'react-bootstrap';
import TaskActions from '../../TaskActions';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';

  const initialState = {
    singleTask: null,
    isEditModal: false,
    loading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "toggleEditModal":
        return {
          ...state,
          isEditModal: !state.isEditModal,
        };
      case "toggleLoading":
        return {
          ...state,
          loading: action.loading
        };
      case "setSingleTask":
        return {
          ...state,
          singleTask: action.data,
        };
      default:
        throw new Error();
    }
  }
  
  const SingleTask = (props) => {
    // Reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    // Effects
    const { id } = props.match.params;
    const { history } = props;
    useEffect(() => {
      dispatch({ type: "toggleLoading", loading: true });
      fetch(`http://localhost:3001/task/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw data.error;
          }
          dispatch({ type: "setSingleTask", data: data });
          dispatch({ type: "toggleLoading", loading: false });
        })
        .catch((error) => {
          history.push("/404");
          console.error("Get single task request error", error);
        });
    },[id, history]);

    useEffect(() => {
      
    })

    // Component Utils
    const {
      singleTask,
      isEditModal,
      loading,
    } = state;

    const handleEditTask = useCallback((formData) => {
      dispatch({ type: "toggleLoading", loading: true });
      fetch("http://localhost:3001/task/" + formData._id, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw data.error;
          };
          dispatch({ type: "setSingleTask", data: data });
          dispatch({ type: "toggleEditModal" });
        })
        .catch((error) => {
          console.error("Single task page, Edit task error", error);
        })
        .finally(() => {
          dispatch({ type: "toggleLoading", loading: false });
        });
    },[]);

    const handleDeleteTask = useCallback((id) => {
      dispatch({ type: "toggleLoading", loading: true });
      fetch(`http://localhost:3001/task/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          throw data.error
        };
        props.history.push('/');
      })
      .catch(error => {
        dispatch({ type: "toggleLoading", loading: false });
        console.error('Get single task request error', error);
      })
    }, [props.history]);

    
    useEffect(() => {

    },[])
    
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
                style={{backgroundColor: "#ff0018", border: 0}}
                variant="info"
                onClick={() => handleDeleteTask(singleTask._id)}
              >
                Delete
              </Button>
              <Button
                style={{backgroundColor: "rgb(0 240 255)", border: 0}}
                className="ml-2"
                variant="warning"
                onClick={() => dispatch({ type: "toggleEditModal" }) }
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
        {
          isEditModal && <TaskActions
            editableTask={singleTask}
            onHide={() => dispatch({ type: "toggleEditModal" }) }
            onSubmit={handleEditTask}
          />
        }
        {
          loading && <Preloader />
        }
      </>
    );
  };
  
  export default SingleTask;