import React from 'react';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SingleTask extends React.Component {
  state = {
    singleTask: null
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

  componentDidMount() { 
    const { id } = this.props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      };
      this.setState({
        singleTask: data
      });
    })
    .catch(error => {
      console.error('Get single task request error', error);
    })
  };

  render() {
    const { singleTask } = this.state;
    if(!singleTask) {
      return(
        <div>
          <span>Loading ...</span>
        </div>
      )
    }

  return (
    <div className={styles.singleTask}>
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
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )};
};

SingleTask.propTypes = {
  handleDeleteTask: PropTypes.func.isRequired,
};

export default SingleTask;