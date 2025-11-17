import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import FormulaList from "../components/formula/FormulaList";
import FormulaForm from "../components/formula/FormulaForm";
import PageLayout from "../components/common/PageLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FormulaPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAfterSave = () => {
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <PageLayout
      title="Fórmulas"
      actions={<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>Agregar Fórmula</Button>}
    >
      <FormulaList refreshKey={refreshKey} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormulaForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default FormulaPage;
