import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5121";
const BASE_PATH = "/api/RazaControlador";

const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const RazaService = {
  getAll: () => api.get(BASE_PATH),
  getById: (id) => api.get(`${BASE_PATH}/${id}`),
  create: (data) => api.post(BASE_PATH, data),
  update: (id, data) => api.put(`${BASE_PATH}/${id}`, data),
  delete: (id) => api.delete(`${BASE_PATH}/${id}`),
};

export default RazaService;
