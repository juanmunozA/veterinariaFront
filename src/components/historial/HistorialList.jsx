import React, { useEffect, useState } from 'react';
import HistorialService from './HistorialService';
import Table from '../common/Table';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const HistorialList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    HistorialService.getAll()
      .then((r) => setItems(r.data))
      .catch((e) => console.error('Error cargar historiales', e));
  }, []);

  const handleDelete = (id) => {
    HistorialService.delete(id)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((e) => console.error('Error eliminar historial', e));
  };

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'mascotaId', title: 'Mascota ID' },
    { field: 'descripcion', title: 'Descripción' },
    { field: 'fecha', title: 'Fecha' },
  ];

  const actions = [
    { label: 'Editar', onClick: (row) => navigate(`/historial/${row.id}`) },
    { label: 'Eliminar', onClick: (row) => handleDelete(row.id) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button variant="contained" color="primary" component={Link} to="/historial/nuevo">Nuevo Historial</Button>
      </div>
      <Table columns={columns} data={items} actions={actions} />
    </div>
  );
};

export default HistorialList;
