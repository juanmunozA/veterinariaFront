import React, { useEffect, useState } from "react";
import { Box, TextField, Button, CircularProgress, Alert } from "@mui/material";
import RazaService from "./RazaService";

const RazaForm = ({ initialData = null, onSuccess = () => {}, onCancel = () => {} }) => {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      // soporta varias formas de nombre que pueda devolver el backend
      setNombre(initialData.nombreRaza ?? initialData.NombreRaza ?? initialData.nombre ?? "");
    } else {
      setNombre("");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const value = (nombre || "").trim();
    if (!value) {
      setError("El nombre es requerido");
      return;
    }

    const payload = { NombreRaza: value }; // backend espera nombreRaza
    setSaving(true);

    try {
      if (initialData && (initialData.razaId ?? initialData.id)) {
        const id = initialData.razaId ?? initialData.id;
        await RazaService.update(id, { razaId: Number(id), nombreRaza: value });
      } else {
        await RazaService.create(payload);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err?.response?.data || err.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="contained" disabled={saving}>
          {saving ? <CircularProgress size={18} /> : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default RazaForm;
