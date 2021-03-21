import React from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../Preloader';
import { Button } from 'react-bootstrap';
import TaskActions from '../../TaskActions';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
class SingleTask extends React.Component {
  state = {
    singleTask: null,
    isEditModal: false,
    loading: false,
  };

  handleDeleteTask = (id) => {
    fetch(`http://localhost:3001/task/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      };
      this.props.history.push('/');
    })
    .catch(error => {
      console.error('Get single task request error', error);
    })
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  handleEditTask = (formData) => {
    this.setState({ loading: true });
    fetch("http://localhost:3001/task/" + formData._id, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      }
      this.setState({
        singleTask: data,
        isEditModal: false,
      });
    })
    .catch(error => {
      console.error("Single task page, Edit task error", error)
    })
    .finally(() => {
      this.setState({ loading: false })
    })
  };

  componentDidMount() { 
    const { id } = this.props.match.params;
    this.setState({ loading: true })
    fetch(`http://localhost:3001/task/${id}`)
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      };
      this.setState({
        singleTask: data,
        loading: false,
      });
    })
    .catch(error => {
      const { history } = this.props;
      history.push("/404");
      console.error('Get single task request error', error);
    });
  };

  render() {
    const {
      singleTask,
      isEditModal,
      loading,
    } = this.state;

    if(!singleTask) return <Preloader />;
  
  return (
    <>
      <div className={styles.singleTask}>
        <div className={styles.singleTaskDiv}>
          <button
            className={styles.button}
            onClick={() => this.props.history.goBack()}
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
              onClick={() => this.handleDeleteTask(singleTask._id)}
            >
              Delete
            </Button>
            <Button
              style={{backgroundColor: "rgb(0 240 255)", border: 0}}
              className="ml-2"
              variant="warning"
              onClick={this.toggleEditModal}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      {
        isEditModal && <TaskActions
          editableTask={singleTask}
          onHide={this.toggleEditModal}
          onSubmit={this.handleEditTask}
        />
      }
      {
        loading && <Preloader />
      }
    </>
  )};
};

SingleTask.propTypes = {
  handleDeleteTask: PropTypes.func.isRequired,
};

export default SingleTask;