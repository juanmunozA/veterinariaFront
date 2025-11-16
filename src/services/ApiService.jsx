import axios from 'axios';
import AuthService from './AuthService';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5121/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir Authorization si hay token
ApiService.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const get = (url) => ApiService.get(url);
export const post = (url, data) => ApiService.post(url, data);
export const put = (url, data) => ApiService.put(url, data);
export const remove = (url) => ApiService.delete(url);

export default ApiService;