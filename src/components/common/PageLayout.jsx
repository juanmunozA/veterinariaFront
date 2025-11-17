import React, { useState } from "react";
import { Box, Typography, Button, Collapse, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../../components/admin/Sidebar";

// Simple PageLayout: title, actions (JSX), optional filters JSX, children content
const PageLayout = ({ title, actions = null, filters = null, children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/* Sidebar dinámico */}
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          mt: "80px", // coincide con la altura del Navbar
          ml: isSmallScreen ? 0 : isSidebarOpen ? "250px" : 0,
          transition: "margin 0.3s ease-in-out",
          p: 2,
          background: theme.palette.background.gradient,
        }}
      >
        {/* Contenido principal con margen dinámico */}
        <Box sx={{ flexGrow: 1, p: 3, width: "100%", maxWidth: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}>
              {title}
            </Typography>

            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, flexDirection: { xs: "column", sm: "row" } }}>
              {actions}
            </Box>
          </Box>

          {/* Filtros opcionales */}
          {filters && (
            <>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setFiltersOpen((s) => !s)}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  {filtersOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
                </Button>
              </Box>
              <Collapse in={filtersOpen}>
                <Paper sx={{ p: 2, mb: 2 }}>{filters}</Paper>
              </Collapse>
            </>
          )}

          <Box
            sx={{
              maxWidth: { xs: "100%", md: "90%", lg: "1200px" },
              margin: "auto",
              p: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageLayout;