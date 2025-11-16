import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import MascotaService from "./MascotaService";

const MascotaForm = ({ initialData = null, onSuccess = null }) => {
  const [form, setForm] = useState({ nombre: "", tipo: "", dueno: "" });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) setForm({ nombre: initialData.nombre ?? "", tipo: initialData.tipo ?? "", dueno: initialData.dueno ?? "" });
    else setForm({ nombre: "", tipo: "", dueno: "" });
    setErr("");
  }, [initialData]);

  const getId = () => initialData?.MascotaId ?? initialData?.id ?? initialData?._id ?? null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setErr(""); setSaving(true);
    const id = getId();
    try {
      if (id) await MascotaService.update(id, form);
      else await MascotaService.create(form);
      if (onSuccess) onSuccess();
    } catch (error) { console.error(error); setErr(error?.response?.data || error.message || "Error"); }
    finally { setSaving(false); }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{initialData ? "Editar Mascota" : "Nueva Mascota"}</Typography>
      <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth required />
      <TextField label="Tipo" name="tipo" value={form.tipo} onChange={handleChange} fullWidth />
      <TextField label="Dueño" name="dueno" value={form.dueno} onChange={handleChange} fullWidth />
      {err && <Alert severity="error">{String(err)}</Alert>}
      <Button type="submit" variant="contained" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
    </Box>
  );
};

export default MascotaForm;