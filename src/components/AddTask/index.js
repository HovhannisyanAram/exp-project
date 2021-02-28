import React from 'react';

import { Form, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
class AddTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      inputValue: "",
    };
  }


  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value
    })
  };

  handleS = ({ key, type }) => {
    if(type === "keypress" && key !== "Enter") return;

    const {handleSubmit} = this.props;
    const { inputValue } = this.state;
    
    handleSubmit(inputValue);
    this.setState({
        inputValue: ''
    });
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { inputValue } = this.state;
    const {disabled} = this.props;

    return(
      <div className="d-flex justify-content-center mt-4">
        <Form.Control
          type="text"
          placeholder="Add text"
          onChange={this.handleChange}
          onKeyPress={this.handleS}
          value={inputValue}
          style={{width: "70%"}}
          disabled={disabled}
          ref={this.inputRef}
        />
        <Button
          variant="primary"
          onClick={this.handleS}
          disabled={!!!inputValue}
        >
          Add
        </Button>
      </div>
    );  
  }
};

AddTask.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default AddTask;