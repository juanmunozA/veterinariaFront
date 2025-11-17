import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistorialService from "./HistorialService";
import HistorialForm from "./HistorialForm";

const HistorialList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const load = () => {
    setErr("");
    HistorialService.getAll().then(r => setItems(r?.data ?? r ?? [])).catch(e => { console.error(e); setErr(e?.message || "Error"); });
  };
  useEffect(() => load(), [refreshKey]);

  const openEditModal = (row) => { setEditing(row); setOpenEdit(true); };
  const openCreateModal = () => { setEditing(null); setOpenCreate(true); };
  const afterSave = () => { setOpenEdit(false); setOpenCreate(false); load(); };

  const handleDelete = async (row) => {
    const id = row.HistorialId ?? row.id ?? row._id;
    if (!id) { setErr("No id para eliminar"); return; }
    if (!window.confirm("¿Eliminar historial?")) return;
    try { await HistorialService.delete(id); load(); } catch (e) { console.error(e); setErr(e?.message || "Error"); }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow><TableCell>Mascota ID</TableCell><TableCell>Descripción</TableCell><TableCell>Fecha</TableCell><TableCell>Acciones</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {items.map((h, i) => (
            <TableRow key={h.HistorialId ?? h.id ?? i}>
              <TableCell>{h.mascotaId}</TableCell>
              <TableCell>{h.descripcion}</TableCell>
              <TableCell>{h.fecha}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => openEditModal(h)} aria-label="editar"><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => handleDelete(h)} aria-label="eliminar"><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <DialogContent><HistorialForm onSuccess={afterSave} /></DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent><HistorialForm initialData={editing} onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default HistorialList;
