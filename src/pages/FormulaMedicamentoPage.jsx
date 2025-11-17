import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import FormulaMedicamentoList from "../components/formulaMedicamento/FormulaMedicamentoList";
import FormulaMedicamentoForm from "../components/formulaMedicamento/FormulaMedicamentoForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FormulaMedicamentoPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Fórmula - Medicamento"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar</Button>}
    >
      <FormulaMedicamentoList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormulaMedicamentoForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default FormulaMedicamentoPage;
