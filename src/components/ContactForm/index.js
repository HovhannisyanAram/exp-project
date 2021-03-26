import React, { createRef } from "react";
import styles from "./contactForm.module.css";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {
  maxLength,
  minLength,
  isRequired,
  emailValid,
  isAllValid, } from "../../helpers/validators"; 
  
const inputsInfo = [
  {
    name: "name",
    controlId: "formBasicName",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    controlId: "formBasicEmail",
    label: "Email",
    type: "email",
  },
  {
    name: "message",
    controlId: "textareaFormContactPage",
    label: "Message area",
    as: "textarea",
    rows: 3,
    maxLength: 100,
  }
]

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      name: {
        value: "",
        valid: false, 
        error: null,
      },
      email: {
        value: "",
        valid: false, 
        error: null,
      },
      message: {
        value: "",
        valid: false, 
        error: null,
      },
      errorMessage: "",
      // isValid: false,
    };
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let error = null;
    
    const maxLength25 = maxLength(25);
    const minLength2 = minLength(2);

    switch (name) {
      case "name":
      case "email":
      case "message":
        error = isRequired(value) ||
        (name === "email" && emailValid(value)) ||
        minLength2(value) ||
        maxLength25(value);
        break;
        default:;
    };
    this.setState({
      [name]: {
        value,
        valid: !!!error,
        error,
      },
      isValid: isAllValid(this.state)
    })
  };

  handleSubmit = () => {
    const formData = { ...this.state };
    delete formData.errorMessage;
    for (let key in formData) {
      formData[key] = formData[key].value;
    };
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/form", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
      const data = await response.json();
      if(data.error) throw data.error;
      this.props.history.push("/")
      } catch(error) {
        this.setState({
          errorMessage: error.message
        })
        console.error("Submit contact form request error", error)
      };
    })();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  };

  render() {
    const {name, email, message, errorMessage} = this.state;
    const isValid = name.valid && email.valid && message.valid;
    const inputs = inputsInfo.map((input, index) => {
      return(
        <Form.Group
          key={index}
          controlId={input.controlId}
          className={styles.formGroup}
        >
          <Form.Label>{input.label}</Form.Label>
          <Form.Control
            as={input.as}
            name={input.name}
            type={input.type}
            rows={input.rows}
            placeholder={input.label}
            maxLength={input.maxLength}
            onChange={this.handleChange}
            value={this.state[input.name].value}
            ref={!index ? this.inputRef : null}
          />
          <Form.Text style={{color: "red"}}>{this.state[input.name].error}</Form.Text>
        </Form.Group>
      )
    })
    return (
      <Container className={styles.container}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <p style={{color: "red"}}>
            {errorMessage}
          </p>
          {inputs}
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
            disabled={!isValid}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ContactForm);
