import { get, post, put, remove } from '../../services/ApiService';

const HistorialService = {
  getAll: () => get('/HistorialClinicoControlador'),
  getById: (id) => get(`/HistorialClinicoControlador/${id}`),
  create: (data) => post('/HistorialClinicoControlador', data),
  update: (id, data) => put(`/HistorialClinicoControlador/${id}`, data),
  delete: (id) => remove(`/HistorialClinicoControlador/${id}`),
};

export default HistorialService;
