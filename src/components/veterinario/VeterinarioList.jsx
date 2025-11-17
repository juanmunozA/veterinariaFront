import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VeterinarioService from "./VeterinarioService";
import VeterinarioForm from "./VeterinarioForm";

const VeterinarioList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const load = () => {
    setErr("");
    VeterinarioService.getAll()
      .then((r) => setItems(r?.data ?? r ?? []))
      .catch((e) => { console.error(e); setErr(e?.message || "Error al cargar"); });
  };

  useEffect(() => load(), [refreshKey]);

  const openEditModal = (row) => { setEditing(row); setOpenEdit(true); };
  const openCreateModal = () => { setEditing(null); setOpenCreate(true); };

  const afterSave = () => { setOpenEdit(false); setOpenCreate(false); load(); };

  const handleDelete = async (row) => {
    const id = row.VeterinarioId ?? row.id ?? row._id;
    if (!id) { setErr("No id para eliminar"); return; }
    if (!window.confirm("¿Eliminar veterinario?")) return;
    try { await VeterinarioService.delete(id); load(); } catch (e) { console.error(e); setErr(e?.message || "Error"); }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((v, i) => (
            <TableRow key={v.VeterinarioId ?? v.id ?? i}>
              <TableCell>{v.nombre}</TableCell>
              <TableCell>{v.telefono}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => openEditModal(v)} aria-label="editar"><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => handleDelete(v)} aria-label="eliminar"><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <DialogContent><VeterinarioForm onSuccess={afterSave} /></DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent><VeterinarioForm initialData={editing} onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default VeterinarioList;
