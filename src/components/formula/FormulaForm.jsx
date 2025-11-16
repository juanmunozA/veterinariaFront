import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormulaService from './FormulaService';
import { TextField, Button, Container, Typography } from '@mui/material';

const FormulaForm = ({ initialData = null, onSuccess = null }) => {
  const [item, setItem] = useState({ nombre: '', descripcion: '' });
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = paramId ?? (initialData && (initialData.FormulaId ?? initialData.id ?? initialData._id)) ?? null;
    if (id && !initialData) {
      FormulaService.getById(id)
        .then((r) => setItem(r.data))
        .catch((e) => console.error('Error cargar formula', e));
    } else if (initialData) {
      setItem({ nombre: initialData.nombre ?? '', descripcion: initialData.descripcion ?? '' });
    } else {
      setItem({ nombre: '', descripcion: '' });
    }
  }, [paramId, initialData]);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = paramId ?? (initialData && (initialData.FormulaId ?? initialData.id ?? initialData._id)) ?? null;
    const action = id ? FormulaService.update(id, item) : FormulaService.create(item);
    action.then(() => {
      if (onSuccess) return onSuccess();
      navigate('/formulas');
    }).catch((e) => console.error('Error guardar formula', e));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{(initialData || paramId) ? 'Editar Fórmula' : 'Nueva Fórmula'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={item.nombre} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Descripción" name="descripcion" value={item.descripcion} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
};

export default FormulaForm;
