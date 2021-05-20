import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { signup } from '../lib/api';
import { Button } from 'react-bootstrap';
import './Signup.css';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '60px'
	}
};

Modal.setAppElement('#root');

function SignupModal() {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ city, setCity ] = useState('');

	const [ modalIsOpen, setModalIsOpen ] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password != confirmPassword) {
			alert('password does not match');
			return;
		}
		const user = {
			firstName,
			lastName,
			phone,
			email,
			password,
			location: city
		};
		await signup(user);
		setFirstName('');
		setLastName('');
		setPhone('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
		setCity('');
		setModalIsOpen(false);
	};

	return (
		<div>
			<div className="signupText">
				Don't have an account? Sign up here
				<Button variant="primary" type="button" className="signupButton" onClick={() => setModalIsOpen(true)}>
					Sign Up
				</Button>
			</div>
			<Modal isOpen={modalIsOpen} style={customStyles}>
				<div className="ModalContainer">
					<form className="SignUpForm" onSubmit={handleSubmit}>
						<div>
							<label for="inputFirstName">First Name</label>
							<input
								type="text"
								class="form-control"
								id="inputFirstName"
								placeholder="First Name"
								onChange={(event) => setFirstName(event.target.value)}
							/>
						</div>
						<div>
							<label for="inputLastName">Last Name</label>
							<input
								type="text"
								class="form-control"
								id="inputLastName"
								placeholder="Last Name"
								onChange={(event) => setLastName(event.target.value)}
							/>
						</div>
						<div>
							<label for="inputEmail4">Email</label>
							<input
								type="email"
								class="form-control"
								id="inputEmail4"
								placeholder="Email"
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>
						<div>
							<label for="inputPhoneNumber">Phone</label>
							<input
								type="number"
								class="form-control"
								id="inputPhoneNumber"
								placeholder="Phone Number"
								onChange={(event) => setPhone(+event.target.value)}
							/>
						</div>
						<div>
							<label for="inputPassword4">Password</label>
							<input
								type="password"
								class="form-control"
								id="inputPassword4"
								placeholder="Password"
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						<div>
							<label for="inputPassword4">Confirm Password</label>
							<input
								type="password"
								class="form-control"
								id="inputConfirmPassword4"
								placeholder="Confirm Password"
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
						</div>
						<div>
							<label for="inputPassword4">City</label>
							<input
								type="city"
								class="form-control"
								id="inputCity"
								placeholder="City"
								onChange={(event) => setCity(event.target.value)}
							/>
						</div>
						<button type="submit" class="btn btn-primary SignUpSubmitButton">
							Sign Up
						</button>
					</form>
					<button class="btn btn-primary SignUpSubmitButton" onClick={() => setModalIsOpen(false)}>
						Close
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default SignupModal;
