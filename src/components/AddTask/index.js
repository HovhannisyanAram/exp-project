import React from 'react';

import { Form, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
class AddTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
    };
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

  handleS = ({ key, type }) => {
    if(type === "keypress" && key !== "Enter") return;

    const { title, description } = this.state;
    const { handleSubmit } = this.props;
    const formData = {
      title,
      description
    }
    
    handleSubmit(formData);
    this.setState({
        title: '',
        description: '',
    });
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { title, description } = this.state;
    const {disabled} = this.props;

    return(
      <div className="d-flex flex-column align-items-center mt-4">
        <Form.Control
          name="title"
          type="text"
          placeholder="Title"
          onChange={this.handleChange}
          onKeyPress={this.handleS}
          value={title}
          style={{width: "70%"}}
          disabled={disabled}
          ref={this.inputRef}
        />
        <Form.Control
          name="description"
          placeholder="Description"
          onChange={this.handleChange}
          className="my-3"
          as="textarea"
          rows={3}
          style={{width: "70%", resize: 'none'}}
          value={description}
        />
        <div>
          <Button
            variant="primary"
            onClick={this.handleS}
            disabled={!(!!title && !!description)}
          >
            Add
          </Button>
        </div>
      </div>
    );  
  }
};

AddTask.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default AddTask;