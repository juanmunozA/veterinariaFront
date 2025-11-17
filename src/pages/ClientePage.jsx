import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import ClienteList from "../components/cliente/ClienteList";
import ClienteForm from "../components/cliente/ClienteForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
    <PageLayout
      title="Clientes"
      actions={
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>
          Agregar Cliente
        </Button>
      }
    >
      <ClienteList refreshKey={refreshKey} />
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <ClienteForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ClientePage;