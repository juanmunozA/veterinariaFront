import React from "react";
import { Box, IconButton, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { ColorModeContext } from "../../theme/AppTheme";

const Navbar = ({ onOpenLogin = () => {} }) => {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const logged = AuthService.isAuthenticated();

  if (location.pathname === "/") return null;

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const handleToggleSidebar = () => {
    // dispara evento global; Sidebar lo escucha y cambia su estado interno
    window.dispatchEvent(new Event("toggleSidebar"));
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        zIndex: 1300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 1,
      }}
    >
      {/* Toggle del sidebar (izquierda) */}
      <IconButton
        onClick={handleToggleSidebar}
        sx={{ color: theme.palette.text.primary, mr: 1 }}
        aria-label="Toggle sidebar"
        size="large"
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
        Veterinaria
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!logged ? (
          <Button color="inherit" onClick={onOpenLogin}>
            Iniciar sesión
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        )}

        <IconButton
          onClick={toggleColorMode}
          sx={{
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            },
          }}
          aria-label="toggle-theme"
        >
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;