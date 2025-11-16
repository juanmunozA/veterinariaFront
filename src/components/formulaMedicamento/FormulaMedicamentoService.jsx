import { get, post, put, remove } from '../../services/ApiService';

const FormulaMedicamentoService = {
  getAll: () => get('/FormulaMedicamentoControlador'),
  getById: (id) => get(`/FormulaMedicamentoControlador/${id}`),
  create: (data) => post('/FormulaMedicamentoControlador', data),
  update: (id, data) => put(`/FormulaMedicamentoControlador/${id}`, data),
  delete: (id) => remove(`/FormulaMedicamentoControlador/${id}`),
};

export default FormulaMedicamentoService;
