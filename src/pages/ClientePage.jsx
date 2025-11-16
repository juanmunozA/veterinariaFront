import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import ClienteList from "../components/cliente/ClienteList";
import ClienteForm from "../components/cliente/ClienteForm";

const ClientePage = () => {
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
        <Typography variant="h4">Clientes</Typography>
        <Button variant="contained" onClick={handleOpen}>Agregar</Button>
      </Box>

      <ClienteList refreshKey={refreshKey} />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <ClienteForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientePage;