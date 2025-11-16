import { get, post, put, remove } from '../../services/ApiService';

const VeterinarioService = {
  getAll: () => get('/VeterinarioControlador'),
  getById: (id) => get(`/VeterinarioControlador/${id}`),
  create: (data) => post('/VeterinarioControlador', data),
  update: (id, data) => put(`/VeterinarioControlador/${id}`, data),
  delete: (id) => remove(`/VeterinarioControlador/${id}`),
};

export default VeterinarioService;
