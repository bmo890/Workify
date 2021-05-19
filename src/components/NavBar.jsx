import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <div className="navBar">
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          <Nav.Link href="/jobform">Post a Job</Nav.Link>  
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
