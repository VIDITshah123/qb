// src/api/axios.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
  This interceptor adds the auth token to every request if it exists.
  This is crucial for accessing protected backend routes.
*/
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;