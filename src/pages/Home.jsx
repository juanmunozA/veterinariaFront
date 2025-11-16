import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../theme/AppTheme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import * as React from "react";
import Login from "../components/auth/Login";
import Footer from "../components/pages/Footer";
import vetImg from "../assets/img/vet.JPG";

const Home = () => {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", // columna para poder centrar footer debajo del card
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.gradient,
        transition: "background 0.5s ease",
        px: 2,
        py: 4,
      }}
    >
      {/* Contenedor centrado del login */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 920, // limita el ancho total del card
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Card principal centrado */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: { xs: "auto", md: 600 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            backgroundColor: theme.palette.background.paper,
            position: "relative",
          }}
        >
          {/* Botón modo claro/oscuro (si quieres ocultarlo dentro del card, quítalo) */}
          <IconButton
            onClick={toggleColorMode}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
              zIndex: 2,
            }}
            aria-label="toggle-theme"
          >
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Columna izquierda */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 4, sm: 6 },
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}
            >
              Bienvenido de nuevo
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary,
                textAlign: "center",
              }}
            >
              Inicia sesión para acceder a tu panel de control
            </Typography>

            <Login />
          </Box>

          {/* Columna derecha */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
              position: "relative",
              backgroundImage: `url(${vetImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: 40,
                color: "#fff",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Gestión de VETERINARIA
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer centrado justo debajo del card */}
      <Box sx={{ width: "100%", maxWidth: 920, mt: 3, display: "flex", justifyContent: "center" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
