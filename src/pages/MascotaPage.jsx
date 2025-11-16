import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import MascotaList from "../components/mascota/MascotaList";
import MascotaForm from "../components/mascota/MascotaForm";

const MascotaPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const afterSave = () => { setOpen(false); setRefreshKey(k=>k+1); };

  return (
    <Box sx={{ pt:10, px:3 }}>
      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:2 }}>
        <Typography variant="h4">Mascotas</Typography>
        <Button variant="contained" onClick={()=>setOpen(true)}>Agregar</Button>
      </Box>
      <MascotaList refreshKey={refreshKey} />
      <Dialog open={open} onClose={()=>setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent><MascotaForm onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default MascotaPage;