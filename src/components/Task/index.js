import React, { memo } from "react";

import styles from "./task.module.css";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import dateFormatter from '../../helpers/date';
import PropTypes from 'prop-types';

const Task = ({
  task,
  disabled,
  handleDeleteOneTask,
  toggleSetRemoveTaskIds,
  checked,
  handleSetEditTask,
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
        <Card.Title>{task.title}</Card.Title>
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
