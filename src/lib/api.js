const axios = require('axios').default;

const baseUrl = 'https://mighty-wave-54695.herokuapp.com';

function getAuthConfig(token) {
	return {
		headers: {
			'auth-token': token
		}
	};
}

export async function signup(user) {
	const response = await axios.post(baseUrl + '/users', user);
	return response.data;
}

export async function login(email, password) {
	const response = await axios.post(baseUrl + '/users/login', {
		email,
		password
	});
	return response.data;
}

export async function getJobList(location) {
	const response = await axios.get(baseUrl + `/jobs/all/${location}`);
	return response.data;
}

export async function getUserById(userId) {
	const response = await axios.get(baseUrl + `/users/${userId}`);
	return response.data;
}

export async function search(searchQuery, location) {
	const response = await axios.get(baseUrl + `/jobs/search?query=${searchQuery}&location=${location}`);
	return response.data;
}

export async function postJob(job) {
	const response = await axios.post(baseUrl + '/jobs/', { job });
	return response.data;
}

export async function getJob(jobId) {
	const response = await axios.get(baseUrl + `/jobs/${jobId}`);
	return response.data;
}

export async function changeEmail(id, newEmail) {
	const response = axios.put(baseUrl + `/users/email`, { id, newEmail });
	return response.data;
}

export async function changePassword(id, email, password, newPassword) {
	const response = axios.put(baseUrl + `/users/password`, {
		id,
		email,
		password,
		newPassword
	});
	return response.data;
}

export async function changeProfile(id, first_name, last_name, phone, location) {
	const response = axios.put(baseUrl + '/users', {
		id,
		first_name,
		last_name,
		phone,
		location
	});
	return response.data;
}
