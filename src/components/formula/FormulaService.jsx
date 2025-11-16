import { get, post, put, remove } from '../../services/ApiService';

const FormulaService = {
  getAll: () => get('/FormulaControlador'),
  getById: (id) => get(`/FormulaControlador/${id}`),
  create: (data) => post('/FormulaControlador', data),
  update: (id, data) => put(`/FormulaControlador/${id}`, data),
  delete: (id) => remove(`/FormulaControlador/${id}`),
};

export default FormulaService;
