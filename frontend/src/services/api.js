// src/services/api.js
import axios from 'axios';

// Menentukan URL backend secara dinamis.
// Jika di production, dia akan mengambil dari file .env frontend.
// Jika di lokal (dan .env belum dibaca), dia akan otomatis fallback ke localhost.
const BACKEND_URL = process.env.REACT_APP_API_URL || import.meta.env?.VITE_API_URL || 'https://backend-pasukanyerussolo-production.up.railway.app';

const api = axios.create({
    baseURL: BACKEND_URL, 
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // 10 detik batas toleransi
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Proteksi otomatis jika mengirim file/FormData
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
        // Log demi mempermudah debugging jika ada error rute ke depan
        console.error("API Error Interceptor:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;