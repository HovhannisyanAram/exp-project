import React from "react";

import { Modal, Button, Form } from "react-bootstrap";

class EditTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.editableTask,
    } 
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }

  handleS = ({type, key}) => {
    if(type === "keypress" && key !== "Enter") return;
    const { onSubmit, onHide } = this.props;
    onSubmit(this.state);
    onHide();
  }

  render() {
    const { onHide } = this.props;
    const { title, description } = this.state;
    return (
      <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Task Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form.Control
            name="title"
            type="text"
            placeholder="Title"
            onChange={this.handleChange}
            onKeyPress={this.handleS}
            value={title}
            style={{ width: "70%" }}
            ref={this.inputRef}
          />
          <Form.Control
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            className="my-3"
            as="textarea"
            rows={3}
            style={{ width: "70%", resize: "none" }}
            value={description}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button onClick={this.handleS} variant="info">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditTaskModal;
