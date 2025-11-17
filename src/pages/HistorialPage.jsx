import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import HistorialList from "../components/historial/HistorialList";
import HistorialForm from "../components/historial/HistorialForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const HistorialPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Historial"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar</Button>}
    >
      <HistorialList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <HistorialForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default HistorialPage;
