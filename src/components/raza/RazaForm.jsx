import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import RazaService from "./RazaService";

const RazaForm = ({ initialData = null, onSuccess = null }) => {
  const [form, setForm] = useState({ nombre: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre:
          initialData.NombreRaza ??
          "",
      });
    } else {
      setForm({ nombre: "" });
    }
    setError("");
  }, [initialData]);

  const getId = () =>
    initialData?.RazaId ?? initialData?.razaId ?? initialData?.id ?? initialData?._id ?? null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const nombreTrim = (form.nombre || "").trim();
    if (!nombreTrim) {
      setError("Nombre es requerido");
      setSaving(false);
      return;
    }

    const payload = {
      NombreRaza: nombreTrim, // clave principal que espera el backend
      Nombre: nombreTrim,     // compatibilidad
      nombre: nombreTrim,
    };

    const id = getId();
    if (id) payload.RazaId = id; // backend exige dto.RazaId == id en PUT

    try {
      if (id) {
        await RazaService.update(id, payload);
      } else {
        delete payload.RazaId;
        await RazaService.create(payload);
        setForm({ nombre: "" });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error guardar raza", err);
      const msg = err?.response?.data?.message || err?.response?.data || err.message || "Error al guardar";
      setError(String(msg));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{initialData ? "Editar Raza" : "Nueva Raza"}</Typography>

      <TextField
        label="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        fullWidth
        required
      />

      {error && <Alert severity="error">{String(error)}</Alert>}

      <Button type="submit" variant="contained" disabled={saving}>
        {saving ? "Guardando..." : "Guardar"}
      </Button>
    </Box>
  );
};

export default RazaForm;
