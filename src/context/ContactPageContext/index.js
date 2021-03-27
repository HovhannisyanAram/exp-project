import { createContext, useState } from "react";
import {
  isRequired,
  maxLength,
  minLength,
  emailValid,
} from "../../helpers/validators";
import { withRouter } from "react-router-dom";

export const ContactContext = createContext();

const ContactContextProvider = ({ 
  history,
  ...props
}) => {
  const [formData, setFormData] = useState({
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
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {

    const contactFormData = { ...formData };

    const isValid =
      contactFormData.name.valid &&
      contactFormData.email.valid &&
      contactFormData.message.valid;

    let error = "";
    if (!contactFormData.name.valid) {
      error = !contactFormData.name.value ? "Field is Required" : contactFormData.name.error;
    } else if (!contactFormData.email.valid) {
      error = !contactFormData.email.value ? "Field is Required" : contactFormData.email.error;
    } else if (!contactFormData.message.valid) {
      error = !contactFormData.message.value ? "Field is Required" : contactFormData.message.error;
    };

    setErrorMessage(error);
    if (!isValid) return;

    for (let key in contactFormData) {
      contactFormData[key] = contactFormData[key].value;
    }

    (async () => {
      try {
        const response = await fetch("http://localhost:3001/form", {
          method: "POST",
          body: JSON.stringify(contactFormData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) throw data.error;
        history.push("/");
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Submit Contact Form Request Error", error);
      }
    })();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = null;
    //validators
    const maxLength25 = maxLength(25);
    const minLength2 = minLength(2);

    switch (name) {
      case "name":
      case "email":
      case "message":
        error =
          isRequired(value) ||
          (name === "email" && emailValid(value)) ||
          minLength2(value) ||
          maxLength25(value);
        break;
      default:
    }
    setFormData({
      ...formData,
      [name]: {
        value,
        valid: !!!error,
        error,
      },
    });
  };

  return (
    <ContactContext.Provider
      value={{
        errorMessage,
        formData,
        handleChange,
        handleSubmit,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default withRouter(ContactContextProvider);
