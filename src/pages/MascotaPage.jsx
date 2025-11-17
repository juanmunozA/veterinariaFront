import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import MascotaList from "../components/mascota/MascotaList";
import MascotaForm from "../components/mascota/MascotaForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MascotaPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const afterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Mascotas"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar</Button>}
    >
      <MascotaList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <MascotaForm onSuccess={afterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default MascotaPage;