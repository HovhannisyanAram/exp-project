import React, { memo } from "react";

import PropTypes from 'prop-types';
import styles from "./task.module.css";
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import dateFormatter from '../../helpers/date';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckSquare, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  checked,
  disabled,
  toggleActiveTask,
  handleSetEditTask,
  handleDeleteOneTask,
  toggleSetRemoveTaskIds,
}) => {
  
  return (
    <Card className={`${styles.card} ${checked && styles.checked}`}>
      <Card.Body className="cardBody">
        <div className="d-flex justify-content-end">
          <input
            type="checkbox"
            onChange={() => toggleSetRemoveTaskIds(task._id)}
            checked={checked}
          />
        </div>
        <Card.Title>
          <Link to={`/task/${task._id}`}>
            {task.title}
          </Link>
        </Card.Title>
        <Card.Text>Description: {task.description}</Card.Text>
        <Card.Text>Date: {dateFormatter(task.date)}</Card.Text>
        <Card.Text>Created_At: {dateFormatter(task.created_at)}</Card.Text>
        <div>
          <Button
            variant="danger"
            disabled={disabled}
            onClick={() => handleDeleteOneTask(task._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            className="ml-3"
            variant="warning"
            disabled={disabled}
            onClick={() => handleSetEditTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            className="ml-3"
            variant="success"
            disabled={disabled}
            onClick={() => toggleActiveTask(task)}
          >
            <FontAwesomeIcon icon={task.status === "active" ? faHourglassHalf : faCheckSquare} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  toggleActiveTask: PropTypes.func.isRequired,
  handleSetEditTask: PropTypes.func.isRequired,
  handleDeleteOneTask: PropTypes.func.isRequired,
  toggleSetRemoveTaskIds: PropTypes.func.isRequired
};

export default memo(Task);
