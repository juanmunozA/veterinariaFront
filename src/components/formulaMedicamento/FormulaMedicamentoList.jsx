import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Dialog, DialogContent, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormulaMedicamentoService from "./FormulaMedicamentoService";
import FormulaMedicamentoForm from "./FormulaMedicamentoForm";

const FormulaMedicamentoList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const load = () => {
    setErr("");
    FormulaMedicamentoService.getAll().then(r => setItems(r?.data ?? r ?? [])).catch(e => { console.error(e); setErr(e?.message || "Error"); });
  };
  useEffect(() => load(), [refreshKey]);

  const openEditModal = (row) => { setEditing(row); setOpenEdit(true); };
  const openCreateModal = () => { setEditing(null); setOpenCreate(true); };
  const afterSave = () => { setOpenEdit(false); setOpenCreate(false); load(); };

  const handleDelete = async (row) => {
    const id = row.Id ?? row.id ?? row._id;
    if (!id) { setErr("No id para eliminar"); return; }
    if (!window.confirm("¿Eliminar relación?")) return;
    try { await FormulaMedicamentoService.delete(id); load(); } catch (e) { console.error(e); setErr(e?.message || "Error"); }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={openCreateModal}>Nueva Relación</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow><TableCell>Formula ID</TableCell><TableCell>Medicamento ID</TableCell><TableCell>Cantidad</TableCell><TableCell>Acciones</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {items.map((r, i) => (
            <TableRow key={r.Id ?? r.id ?? i}>
              <TableCell>{r.formulaId}</TableCell>
              <TableCell>{r.medicamentoId}</TableCell>
              <TableCell>{r.cantidad}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => openEditModal(r)} aria-label="editar"><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => handleDelete(r)} aria-label="eliminar"><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="sm" fullWidth>
        <DialogContent><FormulaMedicamentoForm onSuccess={afterSave} /></DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent><FormulaMedicamentoForm initialData={editing} onSuccess={afterSave} /></DialogContent>
      </Dialog>
    </Box>
  );
};

export default FormulaMedicamentoList;
