import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Homepage';
import JobPage from './JobPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './Components/NavBar';
import JobForm from './Components/JobForm';
import SignupModal from './Components/SignupModal';
import Login from './Components/Login';
import ProfileSettings from './Components/profileSettings/ProfileSettings';
import Logout from './Components/Logout';
import { useAuth } from './Components/Auth';
import { useEffect } from 'react';
import ChangePassword from './Components/profileSettings/ChangePassword';
import ChangeEmail from './Components/profileSettings/ChangeEmail';
import AboutUs from './Components/AboutUs';
import MyJobsPage from './MyJobsPage';
import MyOffersPage from './MyOffersPage';

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

					<PrivateRoute path="/jobform">
						<JobForm />
					</PrivateRoute>
					<Route path="/job/:jobId">
						<JobPage />
					</Route>
					<Route path="/login">
						<div className="LoginPageWrapper">
							<Login />
							<SignupModal />
						</div>
					</Route>
					<Route path="/about">
						<AboutUs />
					</Route>
					<Route path="/profile/changePass">
						<ChangePassword />
					</Route>
					<Route path="/profile/changeEmail">
						<ChangeEmail />
					</Route>
					<PrivateRoute path="/profile">
						<ProfileSettings />
					</PrivateRoute>
					<PrivateRoute path="/myjobs">
						<MyJobsPage />
					</PrivateRoute>
					<PrivateRoute path="/myoffers">
						<MyOffersPage />
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
