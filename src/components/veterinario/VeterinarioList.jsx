import React, { useEffect, useState } from 'react';
import VeterinarioService from './VeterinarioService';
import Table from '../common/Table';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const VeterinarioList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    VeterinarioService.getAll()
      .then((r) => setItems(r.data ?? r ?? []))
      .catch((e) => console.error('Error cargar veterinarios', e));
  }, [refreshKey]);

  const handleDelete = (id) => {
    VeterinarioService.delete(id)
      .then(() => setItems((prev) => prev.filter((i) => (i.id ?? i.VeterinarioId) !== id)))
      .catch((e) => console.error('Error eliminar veterinario', e));
  };

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'nombre', title: 'Nombre' },
    { field: 'telefono', title: 'Teléfono' },
  ];

  const actions = [
    { label: 'Editar', onClick: (row) => navigate(`/veterinarios/${row.id ?? row.VeterinarioId}`) },
    { label: 'Eliminar', onClick: (row) => handleDelete(row.id ?? row.VeterinarioId) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button variant="contained" color="primary" component={Link} to="/veterinarios/nuevo">Nuevo Veterinario</Button>
      </div>
      <Table columns={columns} data={items} actions={actions} />
    </div>
  );
};

export default VeterinarioList;
