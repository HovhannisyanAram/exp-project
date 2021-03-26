import React from 'react';
// import ContactForm from '../../ContactForm';
import ContactFormWithHooks from "../../ContactFormWithHooks";
class Contact extends React.Component {
  render() {
    return(
      <div>
        <h1>Contact Page</h1>
        {/* <ContactForm /> */}
        <ContactFormWithHooks />
      </div>
    )
  };
};

export default Contact;