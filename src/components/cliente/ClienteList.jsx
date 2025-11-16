import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClienteService from "./ClienteService";
import ClienteForm from "./ClienteForm";
import { Button, Dialog, DialogContent } from "@mui/material";

const ClienteList = ({ refreshKey = 0 }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const load = () => {
    setError("");
    ClienteService.getAll()
      .then((res) => setClientes(res?.data ?? res ?? []))
      .catch((e) => {
        console.error("Error cargar clientes", e);
        setError(e?.response?.data || e.message || "Error");
      });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const openEditModal = (row) => {
    setEditingRow(row);
    setOpenEdit(true);
  };

  const handleAfterSave = () => {
    setOpenEdit(false);
    load();
  };

  const handleDelete = async (row) => {
    const idCandidates = [row.id, row.Id, row._id, row.ClienteId, row.clienteId, row.cedula];
    const id = idCandidates.find((x) => x !== undefined && x !== null && String(x) !== "");
    if (!id) {
      console.error("No id disponible para eliminar", row);
      return;
    }
    if (!window.confirm("¿Eliminar cliente?")) return;

    try {
      await ClienteService.delete(id);
      load();
    } catch (err) {
      console.error("Error al eliminar cliente", err);
      setError(err?.response?.data || err.message);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        {/* opcional: botón nuevo redirigido a formulario independiente */}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cédula</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((c, idx) => {
            const key = c.id ?? c._id ?? c.cedula ?? idx;
            return (
              <TableRow key={String(key)}>
                <TableCell>{c.nombre}</TableCell>
                <TableCell>{c.correo ?? ""}</TableCell>
                <TableCell>{c.cedula ?? ""}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => openEditModal(c)} aria-label="editar">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(c)} aria-label="eliminar">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <ClienteForm initialData={editingRow} onSuccess={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClienteList;