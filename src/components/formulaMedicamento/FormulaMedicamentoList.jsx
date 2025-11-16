import React, { useEffect, useState } from 'react';
import FormulaMedicamentoService from './FormulaMedicamentoService';
import Table from '../common/Table';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const FormulaMedicamentoList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FormulaMedicamentoService.getAll()
      .then((r) => setItems(r.data))
      .catch((e) => console.error('Error cargar formula-medicamento', e));
  }, []);

  const handleDelete = (id) => {
    FormulaMedicamentoService.delete(id)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((e) => console.error('Error eliminar relación', e));
  };

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'formulaId', title: 'Formula ID' },
    { field: 'medicamentoId', title: 'Medicamento ID' },
    { field: 'cantidad', title: 'Cantidad' },
  ];

  const actions = [
    { label: 'Editar', onClick: (row) => navigate(`/formulamedicamento/${row.id}`) },
    { label: 'Eliminar', onClick: (row) => handleDelete(row.id) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button variant="contained" color="primary" component={Link} to="/formulamedicamento/nuevo">Nueva Relación</Button>
      </div>
      <Table columns={columns} data={items} actions={actions} />
    </div>
  );
};

export default FormulaMedicamentoList;
