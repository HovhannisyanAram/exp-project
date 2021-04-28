import React, { useContext, useRef, useEffect } from 'react';
import Preloader from '../Preloader';
import { connect } from 'react-redux';
import styles from './form.module.css';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import actionTypes from '../../redux/actionTypes';
import { submitContactFormThunk } from '../../redux/actions';
import { ContactContext } from '../../Context/ContactPageContext';

const inputsInfo = [
  {
    type: "text",
    name: "name",
    label: "Name",
    controlId: "formBasicName",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    controlId: "formBasicEmail",
  },
  {
    rows: 3,
    maxLength: 100,
    name: "message",
    label: "Message",
    as: "textarea",
    controlId: "textareaForContactPage",
  },
];

const ContactForm = (props) => {
  const nameInputRef = useRef(null);
  const context = useContext(ContactContext);

  useEffect(() => {
      nameInputRef.current.focus();
  }, []);

  const {
    formData,
    loading,
    // functions
    changeInputValue,
    submitContactForm
  } = props;

  const { 
    errorMessage
  } = context;
  const { name, email, message } = formData;
  const isValid = name.valid && email.valid && message.valid;

  const inputs = inputsInfo.map((input, index) => {
      return (
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
              onChange={(e) => changeInputValue(e.target)}
              placeholder={input.label}
              value={formData[input.name].value}
              ref={!!!index ? nameInputRef : null}

          />
          <Form.Text style={{ color: "red" }}>{formData[input.name].error}</Form.Text>
        </Form.Group>

      );
  })
    return (
      <div style={{ width: "40%", margin: "0 auto" }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <p style={{ color: "#fb3838", textTransform: "uppercase" }}>
              {errorMessage}
          </p>
          {inputs}
          <Button
              variant="outline-primary"
              type="submit"
              onClick={() => submitContactForm(formData, props.history)}
              disabled={!isValid}
          >
              Submit
        </Button>
        </Form>
        {
          loading && <Preloader />
        }
      </div>
    );
};


const mapStateToProps = (state) => {
  return{
    formData: state.contactState.formData,
    loading: state.todoState.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    changeInputValue: (target) => dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, target }),
    submitContactForm: (formData, history) => dispatch(submitContactFormThunk(formData, history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactForm));
