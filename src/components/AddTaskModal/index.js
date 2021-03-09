import React from "react";

import { Form, Button, Modal } from "react-bootstrap";

import PropTypes from "prop-types";

class AddTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
    };
    this.inputRef = React.createRef(null);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const { title, description } = this.state;
    const { onHide, onSubmit } = this.props;
    if (
      (type === "keypress" && key !== "Enter")
        ||
      (!title || !description)
    ) return;
    const formData = {
      title,
      description,
    };
    onSubmit(formData); 
    onHide();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { title, description } = this.state;
    const { onHide } = this.props;

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
            Add Task Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form.Control
            name="title"
            type="text"
            value={title}
            ref={this.inputRef}
            placeholder="Title"
            style={{ width: "70%" }}
            onKeyPress={this.handleS}
            onChange={this.handleChange}
          />
          <Form.Control
            rows={3}
            as="textarea"
            className="my-3"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
            style={{ width: "70%", resize: "none" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button
            variant="info"
            onClick={this.handleS}
            disabled={!!!title || !!!description}
          >
            Add 
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddTaskModal.propTypes = {
  editableTask: PropTypes.object,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddTaskModal;
