import React from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import dateFormatter from '../../helpers/date';
import { Form, Button, Modal } from "react-bootstrap";

class TaskActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
      date: props.editableTask ? new Date(props.editableTask.date) : new Date(),
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
    const { onSubmit } = this.props;
    if (
      (type === "keypress" && key !== "Enter")
        ||
      (!title || !description)
    ) return;
    const formData = {...this.state};
    formData.date = dateFormatter(formData.date);
    onSubmit(formData); 
    // onHide();
  };

  handleSetDate = (date) => {
    this.setState({
      date,
    });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  };

  render() {
    const { title, description, date } = this.state;
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
          <DatePicker
            selected={date}
            onChange={date => this.handleSetDate(date)}
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
            {this.props.editableTask ? "Save" : "Add"} 
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TaskActions.propTypes = {
  editableTask: PropTypes.object,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskActions;
