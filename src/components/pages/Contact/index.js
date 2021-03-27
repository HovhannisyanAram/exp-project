import React from 'react';
// import ContactForm from '../../ContactForm';
import ContactFormWithHooks from "../../ContactFormWithHooks"; 

const Contact = () => {
    return(
      <div>
        <h1>Contact Page</h1>
        {/* <ContactForm /> */}
        <ContactFormWithHooks />
      </div>
    )

};

export default Contact;