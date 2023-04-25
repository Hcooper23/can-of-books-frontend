import React from 'react';
import { Navbar, NavItem, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './header.css'; // import the CSS file

class Header extends React.Component {
  render() {
    return (
      <Link to="/">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid="md">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
           <NavItem>
            <Link to="/about" className="nav-link">About</Link>
          </NavItem>
          </Container>
        </Navbar>
      </Link>
    )
  }
}

export default Header;