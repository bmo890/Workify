import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from './Auth';

function Logout(props) {
	const auth = useAuth();
	useEffect(() => {
		const logout = async () => {
			await auth.removeToken();
			await auth.removeUser();
			props.history.push('/');
		};
		logout();
	}, []);
	return <div />;
}

export default withRouter(Logout);
