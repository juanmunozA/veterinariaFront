import { get, post, put, remove } from "../../services/ApiService";

const RazaService = {
  getAll: () => get("/RazaControlador"),
  getById: (id) => get(`/RazaControlador/${id}`),
  create: (data) => post("/RazaControlador", data),
  update: (id, data) => put(`/RazaControlador/${id}`, data),
  delete: (id) => remove(`/RazaControlador/${id}`),
};

export default RazaService;
