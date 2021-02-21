import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, handleDeleteOneTask, toggleSetRemoveTaskIds }) => {
  
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body className="cardBody">
        <div className="d-flex justify-content-end">
          <input
            type="checkbox"
            onClick={() => toggleSetRemoveTaskIds(task._id)}
          />
        </div>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div>
          <Button 
            variant="danger"
            onClick={() => handleDeleteOneTask(task._id)}
          >
          <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button variant="warning" className="ml-3">
          <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;
