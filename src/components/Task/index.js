import React, { memo } from "react";

import PropTypes from 'prop-types';
import styles from "./task.module.css";
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import dateFormatter from '../../helpers/date';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  checked,
  disabled,
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
            disabled={disabled}
            variant="danger"
            onClick={() => handleDeleteOneTask(task._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            disabled={disabled}
            variant="warning"
            className="ml-3"
            onClick={() => handleSetEditTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
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
  disabled: PropTypes.bool.isRequired,
  handleDeleteOneTask: PropTypes.func.isRequired,
  toggleSetRemoveTaskIds: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  handleSetEditTask: PropTypes.func.isRequired,
};

export default memo(Task);
