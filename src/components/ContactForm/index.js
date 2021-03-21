import React, { createRef } from "react";
import styles from "./contactForm.module.css";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

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
      name: "",
      email: "",
      message: "",
    };
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = () => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/form", {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "applicaton/json",
          },
        });
      const data = await response.json();
      if(data.error) throw data.error;
      this.props.history.push("/")
      } catch(error) {
        console.error("Submit contact form request error", error)
      };
    })();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  };

  render() {
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
            value={this.state[input.name]}
            ref={!index ? this.inputRef : null}
          />
        </Form.Group>
      )
    })
    return (
      <Container className={styles.container}>
        <Form onSubmit={(e) => e.preventDefault()}>
          {inputs}
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ContactForm);
