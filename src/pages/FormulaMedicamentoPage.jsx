import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import FormulaMedicamentoList from "../components/formulaMedicamento/FormulaMedicamentoList";
import FormulaMedicamentoForm from "../components/formulaMedicamento/FormulaMedicamentoForm";

const FormulaMedicamentoPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <Box sx={{ pt: 10, px: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4">Fórmula - Medicamento</Typography>
        <Button variant="contained" onClick={handleOpen}>Agregar</Button>
      </Box>

      <FormulaMedicamentoList refreshKey={refreshKey} />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormulaMedicamentoForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FormulaMedicamentoPage;
