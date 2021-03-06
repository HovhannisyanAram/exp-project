import {Modal, Button} from 'react-bootstrap';

const Confirm = (props) => {
  
  const {onHide, onSubmit, message} = props;

  return(
    <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={onSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  )
};

export default Confirm;