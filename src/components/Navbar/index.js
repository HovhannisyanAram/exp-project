import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css'
const Navbar = () => {
  return(
    <Nav defaultActiveKey="/home">
      <Nav.Item>
        <NavLink to="/" activeClassName={styles.activeNavLink} exact>Home</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/contact" activeClassName={styles.activeNavLink} exact>Contact</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/about" activeClassName={styles.activeNavLink} exact>About</NavLink>
      </Nav.Item>
    </Nav>
  )
};

export default Navbar; 