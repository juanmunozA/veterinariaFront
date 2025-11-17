import React, { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Collapse, Typography, Tooltip, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";
import MedicationIcon from "@mui/icons-material/Medication";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import { ColorModeContext } from "../../theme/AppTheme";

const SIDEBAR_WIDTH = 250;

const Sidebar = ({ isOpen: isOpenProp, onToggleSidebar: onToggleSidebarProp }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  // internal state: se inicializa desde prop si se pasa
  const [isOpen, setIsOpen] = useState(typeof isOpenProp === "boolean" ? isOpenProp : true);
  const [openIntegraciones, setOpenIntegraciones] = useState(false);

  // sincronia si el padre controla externamente
  useEffect(() => {
    if (typeof isOpenProp === "boolean") setIsOpen(isOpenProp);
  }, [isOpenProp]);

  // escuchador global que permite que el Navbar dispare el toggle sin contexto
  useEffect(() => {
    const handler = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (typeof onToggleSidebarProp === "function") onToggleSidebarProp(next);
        return next;
      });
    };
    window.addEventListener("toggleSidebar", handler);
    return () => window.removeEventListener("toggleSidebar", handler);
  }, [onToggleSidebarProp]);

  const localToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (typeof onToggleSidebarProp === "function") onToggleSidebarProp(next);
      return next;
    });
  };

  const listButtonStyle = {
    boxShadow: 2,
    border: 1,
    borderRadius: 2,
    borderColor: "#00a5ff",
    mb: 2,
  };

  return (
    <Box
      id="app-sidebar"
      component="nav"
      sx={{
        position: "fixed",
        top: "80px",
        left: 0,
        width: `${SIDEBAR_WIDTH}px`,
        height: "calc(100vh - 80px)",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        zIndex: 1200,
        overflowY: "auto",
        px: 1,
        py: 2,
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`,
      }}
    >
      {/* header dentro del sidebar: logo + toggle */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, px: 1 }}>
        <Box onClick={() => navigate("/home-login")} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          
         
        </Box>

        
      </Box>

      <List>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/home-login")} sx={listButtonStyle}>
            <DashboardIcon sx={{ mr: 1 }} />
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/clientes")} sx={listButtonStyle}>
            <PeopleIcon sx={{ mr: 1 }} />
            <ListItemText primary="Clientes" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/mascotas")} sx={listButtonStyle}>
            <PetsIcon sx={{ mr: 1 }} />
            <ListItemText primary="Mascotas" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/razas")} sx={listButtonStyle}>
            <PetsIcon sx={{ mr: 1 }} />
            <ListItemText primary="Razas" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/veterinarios")} sx={listButtonStyle}>
            <PeopleIcon sx={{ mr: 1 }} />
            <ListItemText primary="Veterinarios" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/medicamentos")} sx={listButtonStyle}>
            <MedicationIcon sx={{ mr: 1 }} />
            <ListItemText primary="Medicamentos" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/formulas")} sx={listButtonStyle}>
            <AssignmentIcon sx={{ mr: 1 }} />
            <ListItemText primary="Fórmulas" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton onClick={() => navigate("/historial")} sx={listButtonStyle}>
            <HistoryIcon sx={{ mr: 1 }} />
            <ListItemText primary="Historial" />
          </ListItemButton>
        </ListItem>
      </List>      
    </Box>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};

export default Sidebar;
