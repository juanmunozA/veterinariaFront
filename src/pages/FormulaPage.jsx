import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import FormulaList from "../components/formula/FormulaList";
import FormulaForm from "../components/formula/FormulaForm";

const FormulaPage = () => {
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
        <Typography variant="h4">Fórmulas</Typography>
        <Button variant="contained" onClick={handleOpen}>Agregar Fórmula</Button>
      </Box>

      <FormulaList refreshKey={refreshKey} />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormulaForm onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FormulaPage;
