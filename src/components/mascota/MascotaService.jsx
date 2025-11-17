import { get, post, put, remove } from '../../services/ApiService';

const MascotaService = {
  getAll: () => get('/MascotaControlador'),
  getById: (id) => get(`/MascotaControlador/${id}`),
  // backend expects { nombre, edad, cedulaCliente, razaId }
  create: (data) => post('/MascotaControlador', data),
  update: (id, data) => put(`/MascotaControlador/${id}`, data),
  delete: (id) => remove(`/MascotaControlador/${id}`),
};

export default MascotaService;