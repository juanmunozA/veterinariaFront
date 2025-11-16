import React, { useEffect, useState } from 'react';
import MedicamentoService from './MedicamentoService';
import Table from '../common/Table';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const MedicamentoList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    MedicamentoService.getAll()
      .then((r) => setItems(r.data))
      .catch((e) => console.error('Error cargar medicamentos', e));
  }, []);

  const handleDelete = (id) => {
    MedicamentoService.delete(id)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((e) => console.error('Error eliminar medicamento', e));
  };

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'nombre', title: 'Nombre' },
    { field: 'presentacion', title: 'Presentación' },
  ];

  const actions = [
    { label: 'Editar', onClick: (row) => navigate(`/medicamentos/${row.id}`) },
    { label: 'Eliminar', onClick: (row) => handleDelete(row.id) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button variant="contained" color="primary" component={Link} to="/medicamentos/nuevo">Nuevo Medicamento</Button>
      </div>
      <Table columns={columns} data={items} actions={actions} />
    </div>
  );
};

export default MedicamentoList;
