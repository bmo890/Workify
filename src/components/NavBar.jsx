import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { useAuth } from './Auth';

function NavBar() {
	const auth = useAuth();
	return (
		<div className="navBar">
			<Navbar bg="dark" variant="dark">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/about">About Us</Nav.Link>
					{auth.user && <Nav.Link href="/jobform">Post a Job</Nav.Link>}
					{auth.user && <Nav.Link href="/profile">Profile</Nav.Link>}
					{auth.user && <Nav.Link href="/myjobs">My Jobs</Nav.Link>}
					{auth.user && <Nav.Link href="/myoffers">My Offers</Nav.Link>}
					<Nav.Link href={auth.user ? '/logout' : '/login'}>{auth.user ? 'Logout' : 'Login'}</Nav.Link>
				</Nav>
			</Navbar>
		</div>
	);
}

export default NavBar;
