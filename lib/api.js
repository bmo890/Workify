const axios = require('axios').default;

const baseUrl = "http;//localhost:3000";

function getAuthConfig(token) {
    return {
        headers: {
            "auth-token": token
        }
    }
}

export async function signup(user) {
    const response = await axios.post(baseUrl + "/signup", {
        user
    });
    return response.data;
}

export async function login(email, password) {
    const response = await axios.post(baseUrl + "/login", {
        email,
        password,
    });
    return response.data;
}

export async function getJobList(location) {
    const response = await axios.get(baseUrl + "/jobList", { location });
    return response.data;
}

export async function search(searchQuery, location) {
    const response = await axios.get(baseUrl + "/search", { searchQuery, location })
    return response.data;
}

export async function postJob(job) {
    const response = await axios.post(baseUrl + "/postNewJob", { job })
    return response.data;
}

export async function getJob(jobId) {
    const response = axios.get(baseUrl + "/getJobById", { jobId });
    return response.data;
}

export async function changeEmail(email, userId) {
    const response = axios.put(baseUrl + "changeEmail", { email, userId });
    return response.data;
}

export async function changePassword(oldPassword, newPassword) {
    const response = axios.put(baseUrl + "changePass", {
        oldPassword,
        newPassword
    });
    return response.data;
}

export async function changeProfile(name, phone, location) {
    const response = axios.put(baseUrl + "/editProfile", {
        name,
        phone,
        location
    });
    return response.data;
}