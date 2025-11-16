import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MedicamentoService from './MedicamentoService';
import { TextField, Button, Container, Typography } from '@mui/material';

const MedicamentoForm = ({ initialData = null, onSuccess = null }) => {
  const [item, setItem] = useState({ nombre: '', presentacion: '' });
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = paramId ?? (initialData && (initialData.MedicamentoId ?? initialData.id ?? initialData._id)) ?? null;
    if (id && !initialData) {
      MedicamentoService.getById(id)
        .then((r) => setItem(r.data))
        .catch((e) => console.error('Error cargar medicamento', e));
    } else if (initialData) {
      setItem({ nombre: initialData.nombre ?? '', presentacion: initialData.presentacion ?? '' });
    } else {
      setItem({ nombre: '', presentacion: '' });
    }
  }, [paramId, initialData]);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = paramId ?? (initialData && (initialData.MedicamentoId ?? initialData.id ?? initialData._id)) ?? null;
    const action = id ? MedicamentoService.update(id, item) : MedicamentoService.create(item);
    action.then(() => {
      if (onSuccess) return onSuccess();
      navigate('/medicamentos');
    }).catch((e) => console.error('Error guardar medicamento', e));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{(initialData || paramId) ? 'Editar Medicamento' : 'Nuevo Medicamento'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={item.nombre} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Presentación" name="presentacion" value={item.presentacion} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
};

export default MedicamentoForm;
