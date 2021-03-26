import React, { useState } from "react";
import styles from "../ContactForm/contactForm.module.css";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {
  maxLength,
  minLength,
  isRequired,
  emailValid, } from "../../helpers/validators"; 

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

const ContactFormWithHooks = ({
  history,
  ...props
}) => {
  const [formData, setFormData] = useState({
    name: {
        value: "",
        valid: false,
        error: null
    },
    email: {
        value: "",
        valid: false,
        error: null
    },
    message: {
        value: "",
        valid: false,
        error: null
    },
});

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const contactFormData = { ...formData };

    const isValid = contactFormData.name.valid && 
      contactFormData.email.valid && 
      contactFormData.message.valid;
    
    let error = "";

    if(!contactFormData.name.valid) {
      error = !contactFormData.name.valid ? "Field is Required" : contactFormData.name.error;
    } else if (!contactFormData.email.valid) {
      error = !contactFormData.email.valid ? "Field is Required" : contactFormData.email.error;
    } else if (!contactFormData.message.valid) {
      error = !contactFormData.message.valid ? "Field is Required" : contactFormData.email.error;
    };

    setErrorMessage(error);
    if (!isValid) return;

    for (let key in contactFormData) {
      contactFormData[key] = contactFormData[key].value;
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
      history.push("/");
      } catch(error) {
        setErrorMessage(error.message)
        console.error("Submit contact form request error", error)
      };
    })();
  };

  const handleChange = (e) => {
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
    setFormData({
      ...formData,
      [name]: {
        value,
        valid: !!!error,
        error,
      },
    });
  };

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
          onChange={handleChange}
          value={[input.name].value}
        />
        <Form.Text style={{color: "red"}}>{[input.name].error}</Form.Text>
      </Form.Group>
    )
  });
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
            onClick={handleSubmit}
            disabled={!handleSubmit.isValid}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
};


export default withRouter(ContactFormWithHooks);