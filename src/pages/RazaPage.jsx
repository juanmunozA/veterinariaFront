import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import RazaList from "../components/raza/RazaList";
import RazaForm from "../components/raza/RazaForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const RazaPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Razas"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar Raza</Button>}
    >
      <RazaList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <RazaForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default RazaPage;
