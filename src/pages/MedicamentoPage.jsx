import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import MedicamentoList from "../components/medicamento/MedicamentoList";
import MedicamentoForm from "../components/medicamento/MedicamentoForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MedicamentoPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Medicamentos"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar Medicamento</Button>}
    >
      <MedicamentoList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <MedicamentoForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default MedicamentoPage;
