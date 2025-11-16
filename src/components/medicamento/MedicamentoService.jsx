import { get, post, put, remove } from '../../services/ApiService';

const MedicamentoService = {
  getAll: () => get('/MedicamentoControlador'),
  getById: (id) => get(`/MedicamentoControlador/${id}`),
  create: (data) => post('/MedicamentoControlador', data),
  update: (id, data) => put(`/MedicamentoControlador/${id}`, data),
  delete: (id) => remove(`/MedicamentoControlador/${id}`),
};

export default MedicamentoService;
