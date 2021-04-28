import React, { useRef, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styles from "../ContactForm/contactForm.module.css";

import { ContactContext } from "../../context/ContactPageContext";

const inputsInfo = [
  {
    name: "name",
    type: "text",
    label: "Name",
    controlId: "formBasicName",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    controlId: "formBasicEmail",
  },
  {
    rows: 3,
    as: "textarea",
    maxLength: 100,
    name: "message",
    label: "Message",
    controlId: "textareaForContactPage",
  },
];
const ContactForm = () => {
  const nameInputRef = useRef(null);
  const context = useContext(ContactContext);
  useEffect(() => {
    nameInputRef.current.focus();
  }, [])
  const {
    formData,
    errorMessage,
    handleChange,
    handleSubmit, } = context;
  const { name, email, message } = formData;
  const isValid = name.valid && email.valid && message.valid;

  const inputs = inputsInfo.map((input, index) => {
    return(
      <Form.Group
        controlId={input.controlId}
        className={styles.formGroup}
        key={index}
      >
        <Form.Label style={{color: "aqua"}}>{input.label}</Form.Label>
        <Form.Control
          ref={!!!index ? nameInputRef : null}
          name={input.name}
          type={input.type}
          placeholder={input.label}
          as={input.as}
          rows={input.rows}
          value={formData[input.name].value}
          onChange={handleChange}
        />
        <Form.Text style={{ color: "red" }}>
          {formData[input.name].error}
        </Form.Text>
      </Form.Group>
    );
  });
  return(
    <div style={{ width: "40%", margin: "0 auto" }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <p style={{ color: "#fb3838", textTransform: "uppercase" }}>
          {errorMessage}
        </p>
        {inputs}
        <Button
          variant="outline-info"
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(ContactForm);
