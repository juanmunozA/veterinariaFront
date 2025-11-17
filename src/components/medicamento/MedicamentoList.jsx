import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicamentoService from "./MedicamentoService";
import MedicamentoForm from "./MedicamentoForm";

const MedicamentoList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const load = () => {
    setErr("");
    MedicamentoService.getAll().then(r => setItems(r?.data ?? r ?? [])).catch(e => { console.error(e); setErr(e?.message || "Error"); });
  };
  useEffect(() => load(), [refreshKey]);

  const openEditModal = (row) => { setEditing(row); setOpenEdit(true); };
  const openCreateModal = () => { setEditing(null); setOpenCreate(true); };
  const afterSave = () => { setOpenEdit(false); setOpenCreate(false); load(); };

  const handleDelete = async (row) => {
    const id = row.MedicamentoId ?? row.id ?? row._id;
    if (!id) { setErr("No id para eliminar"); return; }
    if (!window.confirm("¿Eliminar medicamento?")) return;
    try { await MedicamentoService.delete(id); load(); } catch (e) { console.error(e); setErr(e?.message || "Error"); }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow><TableCell>Nombre</TableCell><TableCell>Presentación</TableCell><TableCell>Acciones</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {items.map((m, i) => (
            <TableRow key={m.MedicamentoId ?? m.id ?? i}>
              <TableCell>{m.nombre}</TableCell>
              <TableCell>{m.presentacion}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => openEditModal(m)} aria-label="editar"><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => handleDelete(m)} aria-label="eliminar"><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <DialogContent><MedicamentoForm onSuccess={afterSave} /></DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent><MedicamentoForm initialData={editing} onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default MedicamentoList;
