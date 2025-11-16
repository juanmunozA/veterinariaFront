import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Dialog,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RazaService from "./RazaService";
import RazaForm from "./RazaForm";

const RazaList = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    RazaService.getAll()
      .then((res) => {
        const data = res?.data ?? res ?? [];
        console.debug("RazaService.getAll response:", data);
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error("Error cargar razas", e);
        setError(e?.response?.data || e.message || "Error al cargar");
        setItems([]);
      });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const openEditForRow = (row) => {
    setEditRow(row);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditRow(null);
  };

  const afterSave = () => {
    closeEditDialog();
    load();
  };

  const handleDelete = async (row) => {
    setError("");
    const id = row.RazaId ?? row.razaId ?? row.id ?? row._id;
    if (!id) {
      setError("No se pudo determinar el id para eliminar");
      return;
    }
    if (!window.confirm("¿Eliminar raza?")) return;
    try {
      await RazaService.delete(id);
      load();
    } catch (e) {
      console.error("Error eliminar raza", e);
      setError(e?.response?.data || e.message || "Error al eliminar");
    }
  };

  const readName = (x) => x?.NombreRaza ?? x?.Nombre ?? x?.nombre ?? x?.name ?? "";

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((x, i) => (
            <TableRow key={x.RazaId ?? x.id ?? i}>
              <TableCell>{readName(x)}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => openEditForRow(x)} aria-label="editar">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(x)} aria-label="eliminar">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openEditDialog} onClose={closeEditDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <RazaForm initialData={editRow} onSuccess={afterSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RazaList;