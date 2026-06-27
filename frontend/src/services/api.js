// src/services/api.js
import axios from 'axios';

const getBaseURL = () => {
  // Jika ada env REACT_APP_API_URL (seperti di Railway), gunakan itu.
  // Jika tidak ada (seperti di lokal), dia akan fallback ke localhost.
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api`;
  }
  return 'http://localhost:5005/api';
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Optional: redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;