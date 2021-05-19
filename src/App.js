import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Homepage';
import JobPage from './JobPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './Components/About';
import NavBar from './Components/NavBar';
import JobForm from './Components/JobForm';
import SignupModal from './Components/SignupModal';
import Login from './Components/Login';
import ProfileSettings from './Components/profileSettings/ProfileSettings';
import Logout from './Components/Logout';
import { useAuth } from './Components/Auth';
import { useEffect } from 'react';

function PrivateRoute({ children, ...rest }) {
	let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.token ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
}

function App() {
	const auth = useAuth();
	if (!auth.isInitiallyLoaded) {
		return <div />;
	}
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Homepage />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<PrivateRoute path="/jobform">
						<JobForm />
					</PrivateRoute>
					<Route path="/job/:jobId">
						<JobPage />
					</Route>
					<Route path="/login">
						<SignupModal />
						<Login />
					</Route>
					<PrivateRoute path="/profile">
						<ProfileSettings />
					</PrivateRoute>
					<PrivateRoute path="/logout">
						<Logout />
					</PrivateRoute>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
