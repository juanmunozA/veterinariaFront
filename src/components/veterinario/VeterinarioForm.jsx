import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VeterinarioService from './VeterinarioService';
import { TextField, Button, Container, Typography } from '@mui/material';

const VeterinarioForm = ({ initialData = null, onSuccess = null }) => {
  const [item, setItem] = useState({ nombre: '', telefono: '' });
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = paramId ?? (initialData && (initialData.VeterinarioId ?? initialData.id ?? initialData._id)) ?? null;
    if (id && !initialData) {
      VeterinarioService.getById(id)
        .then((r) => setItem(r.data))
        .catch((e) => console.error('Error cargar veterinario', e));
    } else if (initialData) {
      setItem({ nombre: initialData.nombre ?? initialData.Nombre ?? '', telefono: initialData.telefono ?? initialData.Telefono ?? '' });
    } else {
      setItem({ nombre: '', telefono: '' });
    }
  }, [paramId, initialData]);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = paramId ?? (initialData && (initialData.VeterinarioId ?? initialData.id ?? initialData._id)) ?? null;
    const action = id ? VeterinarioService.update(id, item) : VeterinarioService.create(item);
    action
      .then(() => {
        if (onSuccess) return onSuccess();
        navigate('/veterinarios');
      })
      .catch((e) => {
        console.error('Error guardar veterinario', e);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{(initialData || paramId) ? 'Editar Veterinario' : 'Nuevo Veterinario'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={item.nombre} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Teléfono" name="telefono" value={item.telefono} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
};

export default VeterinarioForm;
