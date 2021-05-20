import { queryByRole } from '@testing-library/react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthProvider, { useAuth } from '../Components/Auth';
import { login } from '../lib/api';

const Login = (props) => {
	let auth = useAuth();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const handleOnSubmit = async (event) => {
		event.preventDefault();
		if (email && password) {
			try {
				const { token, user } = await login(email, password);
				console.log(token, user);
				await auth.saveToken(token);
				await auth.saveUser(user);
				props.history.push('/');
			} catch (err) {
				alert('Bad username and password');
			}
		}
	};
	return (
		<form className="loginForm" onSubmit={handleOnSubmit}>
			<div className="emailTag">
				<label htmlFor="email" />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					name="email"
					id="email"
					placeholder="Email"
				/>
			</div>
			<div className="passwordTag">
				<label htmlFor="password" />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
			</div>
			<div>
				<button className="loginButton" 
				// class="btn btn-primary" 
				type="submit">
					Login
				</button>
			</div>
		</form>
	);
};

export default withRouter(Login);
