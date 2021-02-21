import React, { memo } from 'react';

import styles from './task.module.css';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Task = ({
  task,
  disabled,
  handleDeleteOneTask,
  toggleSetRemoveTaskIds,
  checked
}) => {
  
  return (
    <Card className={`${styles.card} ${checked && styles.checked}`}>
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
            disabled={disabled}
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

// class Task extends React.PureComponent {

//   render() {
//     const {
//       task,
//       disabled,
//       handleDeleteOneTask,
//       toggleSetRemoveTaskIds,
//       checked
//     } = this.props;
//  
//     return (
//       <Card className={`${styles.card} ${checked && styles.checked}`}>
//         <Card.Body className="cardBody">
//           <div className="d-flex justify-content-end">
//             <input
//               type="checkbox"
//               onClick={() => toggleSetRemoveTaskIds(task._id)}
//             />
//           </div>
//           <Card.Title>{task.title}</Card.Title>
//           <Card.Text>
//             Some quick example text to build on the card title and make up the
//             bulk of the card's content.
//           </Card.Text>
//           <div>
//             <Button 
//               disabled={disabled}
//               variant="danger"
//               onClick={() => handleDeleteOneTask(task._id)}
//             >
//             <FontAwesomeIcon icon={faTrash} />
//             </Button>
//             <Button variant="warning" className="ml-3">
//             <FontAwesomeIcon icon={faEdit} />
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     );
//   };
// };



export default memo(Task);
