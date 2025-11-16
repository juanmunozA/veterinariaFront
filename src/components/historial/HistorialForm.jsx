import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HistorialService from './HistorialService';
import { TextField, Button, Container, Typography } from '@mui/material';

const HistorialForm = ({ initialData = null, onSuccess = null }) => {
  const [item, setItem] = useState({ mascotaId: '', descripcion: '', fecha: '' });
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = paramId ?? (initialData && (initialData.HistorialId ?? initialData.id ?? initialData._id)) ?? null;
    if (id && !initialData) {
      HistorialService.getById(id).then(r => setItem(r.data)).catch(e => console.error('Error cargar historial', e));
    } else if (initialData) {
      setItem({ mascotaId: initialData.mascotaId ?? '', descripcion: initialData.descripcion ?? '', fecha: initialData.fecha ?? '' });
    } else {
      setItem({ mascotaId: '', descripcion: '', fecha: '' });
    }
  }, [paramId, initialData]);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = paramId ?? (initialData && (initialData.HistorialId ?? initialData.id ?? initialData._id)) ?? null;
    const action = id ? HistorialService.update(id, item) : HistorialService.create(item);
    action.then(() => {
      if (onSuccess) return onSuccess();
      navigate('/historial');
    }).catch(e => console.error('Error guardar historial', e));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{(initialData || paramId) ? 'Editar Historial' : 'Nuevo Historial'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Mascota ID" name="mascotaId" value={item.mascotaId} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Descripción" name="descripcion" value={item.descripcion} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha" name="fecha" value={item.fecha} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
};

export default HistorialForm;
