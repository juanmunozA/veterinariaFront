import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Dialog, DialogContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MascotaService from "./MascotaService";
import MascotaForm from "./MascotaForm";

const MascotaList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const load = () => {
    setErr("");
    MascotaService.getAll().then(r => setItems(r?.data ?? r ?? [])).catch(e => { console.error(e); setErr(e?.message || "Error"); });
  };
  useEffect(() => load(), [refreshKey]);

  const openEditModal = (row) => { setEditing(row); setOpenEdit(true); };
  const afterSave = () => { setOpenEdit(false); load(); };

  const handleDelete = async (row) => {
    const id = row.MascotaId ?? row.id ?? row._id ?? row.cedula;
    if (!id) { setErr("No id para eliminar"); return; }
    if (!window.confirm("¿Eliminar mascota?")) return;
    try { await MascotaService.delete(id); load(); } catch (e) { console.error(e); setErr(e?.message || "Error"); }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow><TableCell>Nombre</TableCell><TableCell>Tipo</TableCell><TableCell>Dueño</TableCell><TableCell>Acciones</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {items.map((m, i) => (
            <TableRow key={m.MascotaId ?? m.id ?? i}>
              <TableCell>{m.nombre}</TableCell>
              <TableCell>{m.tipo}</TableCell>
              <TableCell>{m.dueno}</TableCell>
              <TableCell>
                <IconButton onClick={() => openEditModal(m)}><EditIcon/></IconButton>
                <IconButton onClick={() => handleDelete(m)}><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent><MascotaForm initialData={editing} onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default MascotaList;