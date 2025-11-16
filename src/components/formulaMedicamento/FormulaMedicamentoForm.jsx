import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormulaMedicamentoService from './FormulaMedicamentoService';
import { TextField, Button, Container, Typography } from '@mui/material';

const FormulaMedicamentoForm = ({ initialData = null, onSuccess = null }) => {
  const [item, setItem] = useState({ formulaId: '', medicamentoId: '', cantidad: '' });
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = paramId ?? (initialData && (initialData.Id ?? initialData.id ?? initialData._id)) ?? null;
    if (id && !initialData) {
      FormulaMedicamentoService.getById(id).then(r => setItem(r.data)).catch(e => console.error('Error cargar relación', e));
    } else if (initialData) {
      setItem({ formulaId: initialData.formulaId ?? '', medicamentoId: initialData.medicamentoId ?? '', cantidad: initialData.cantidad ?? '' });
    } else {
      setItem({ formulaId: '', medicamentoId: '', cantidad: '' });
    }
  }, [paramId, initialData]);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = paramId ?? (initialData && (initialData.Id ?? initialData.id ?? initialData._id)) ?? null;
    const action = id ? FormulaMedicamentoService.update(id, item) : FormulaMedicamentoService.create(item);
    action.then(() => {
      if (onSuccess) return onSuccess();
      navigate('/formulamedicamento');
    }).catch(e => console.error('Error guardar relación', e));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{(initialData || paramId) ? 'Editar Relación' : 'Nueva Relación'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Formula ID" name="formulaId" value={item.formulaId} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Medicamento ID" name="medicamentoId" value={item.medicamentoId} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Cantidad" name="cantidad" value={item.cantidad} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
      </form>
    </Container>
  );
};

export default FormulaMedicamentoForm;
