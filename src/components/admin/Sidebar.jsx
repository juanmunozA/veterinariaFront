import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SIDEBAR_WIDTH = 250;

const Sidebar = ({ isOpen = true, onToggleSidebar = () => {} }) => {
  if (!isOpen) return null;

  return (
    <Box
      id="app-sidebar"
      component="nav"
      sx={{
        position: "fixed",
        top: "80px",                     // sitúa el sidebar debajo del Navbar (altura navbar = 80px)
        left: 0,
        width: `${SIDEBAR_WIDTH}px`,
        height: "calc(100vh - 80px)",   // ocupa el resto de la ventana sin solaparse con navbar
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        zIndex: 1200,                    // menor que Navbar (Navbar zIndex ~1300)
        overflowY: "auto",
        px: 1,
        py: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/clientes">
          <ListItemText primary="Clientes" />
        </ListItem>
        {/* ...otras rutas */}
      </List>
    </Box>
  );
};

export default Sidebar;
