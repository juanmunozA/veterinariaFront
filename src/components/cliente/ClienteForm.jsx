import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import ClienteService from "./ClienteService";

const ClienteForm = ({ initialData = null, onSuccess = null }) => {
  const [cliente, setCliente] = useState({ nombre: "", correo: "", cedula: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setCliente({
        nombre: initialData.nombre ?? "",
        correo: initialData.correo ?? initialData.email ?? "",
        cedula: initialData.cedula ?? "",
      });
    } else {
      setCliente({ nombre: "", correo: "", cedula: "" });
    }
  }, [initialData]);

  const handleChange = (e) => setCliente({ ...cliente, [e.target.name]: e.target.value });

  const getIdFromInitial = () => {
    if (!initialData) return null;
    return (
      initialData.ClienteId ??
      initialData.clienteId ??
      initialData.ClientId ??
      initialData.id ??
      initialData._id ??
      null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const id = getIdFromInitial();

    const payload = {
      nombre: cliente.nombre,
      correo: cliente.correo,
      cedula: cliente.cedula,
    };

    try {
      if (id) {
        console.debug("Actualizar ClienteId:", id, "payload:", payload);
        await ClienteService.update(id, payload);
      } else {
        console.debug("Crear cliente payload:", payload);
        await ClienteService.create(payload);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error guardar cliente", err);
      setError(err?.response?.data || err.message || "Error al guardar");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{initialData ? "Editar Cliente" : "Nuevo Cliente"}</Typography>

      <TextField label="Nombre" name="nombre" value={cliente.nombre} onChange={handleChange} fullWidth required />
      <TextField label="Correo" name="correo" value={cliente.correo} onChange={handleChange} fullWidth />
      <TextField label="Cédula" name="cedula" value={cliente.cedula} onChange={handleChange} fullWidth />

      {error && <Alert severity="error">{String(error)}</Alert>}

      <Button type="submit" variant="contained">Guardar</Button>
    </Box>
  );
};

export default ClienteForm;