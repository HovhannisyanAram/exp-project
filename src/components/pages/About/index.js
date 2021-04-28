import React from 'react';
import styles from './about.module.css';

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About Page</h1>
        <h3>Aram Hovhannisyan</h3>
        <p className={styles.p}>
          Meticulous web developer with a love of beating personal bests,
          <br />
          eager to work as a junior/intern front end developer. My enthusiasm
          and
          <br />
          industrial knowledge have prepared me for new opportunities and I'm
          ready for new challenges.
        </p>
        <div>
          <h4>Experince</h4>
          <p className={styles.p}>February 2018 - Present:  Accountant Cafesjian Museum Foundation</p>
        </div>
        <div className={styles.contacts}>
          <h4>Personal contacts</h4>
          <p className={styles.p}>
            Email: aramoffpage@gmail.com
            <br />
            Phone: (+374) 77-90-75-99
            <br />
            Date of birth: 09-01-1995
            <br />
            Nationality: Armenian
            <br />
            Links: linkedin.com/in/aram-hovhannisyan-8514a513a/
          </p>
        </div>
      </div>
    );
  };
};

export default About;