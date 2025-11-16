import React, { useEffect, useState } from 'react';
import FormulaService from './FormulaService';
import Table from '../common/Table';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const FormulaList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FormulaService.getAll()
      .then((r) => setItems(r.data))
      .catch((e) => console.error('Error cargar formulas', e));
  }, []);

  const handleDelete = (id) => {
    FormulaService.delete(id)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((e) => console.error('Error eliminar formula', e));
  };

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'nombre', title: 'Nombre' },
    { field: 'descripcion', title: 'Descripción' },
  ];

  const actions = [
    { label: 'Editar', onClick: (row) => navigate(`/formulas/${row.id}`) },
    { label: 'Eliminar', onClick: (row) => handleDelete(row.id) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button variant="contained" color="primary" component={Link} to="/formulas/nuevo">Nueva Fórmula</Button>
      </div>
      <Table columns={columns} data={items} actions={actions} />
    </div>
  );
};

export default FormulaList;
