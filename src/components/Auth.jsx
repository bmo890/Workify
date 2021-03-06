import { createContext, useEffect, useContext, useState } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext({
	isInitiallyLoaded: false,
	token: '',
	saveToken: async (token) => {},
	removeToken: async () => {},
	saveUser: async (user) => {},
	removeUser: async () => {},
	user: null
});

const tokenKey = 'userToken';

const userKey = 'userInfo';

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = (props) => {
	const [ isInitiallyLoaded, setIsInitiallyLoaded ] = useState(false);
	const [ token, setToken ] = useState();
	const [ user, setUser ] = useState();

	const saveToken = async (token) => {
		setToken(token);
		await localforage.setItem(tokenKey, token);
	};

	const removeToken = async () => {
		setToken();
		await localforage.removeItem(tokenKey);
	};
	useEffect(() => {
		const awaitUser = async () => {
			await localforage.getItem(tokenKey).then((token) => {
				if (token) {
					setToken(token);
				}
			});
			await localforage.getItem(userKey).then((user) => {
				if (user) {
					setUser(user);
				}
			});
			setIsInitiallyLoaded(true);
		};
		awaitUser();
	}, []);

	const saveUser = async (user) => {
		setUser(user);
		await localforage.setItem(userKey, user);
	};

	const removeUser = async () => {
		setUser(null);
		await localforage.removeItem(userKey);
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				isInitiallyLoaded,
				saveToken,
				removeToken,
				saveUser,
				removeUser,
				user
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
