import { Typography, Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/pages/Footer";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import AuthService from "../services/AuthService"; 

const HomeLogin = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState({ nombre: "Usuario", rol: "Invitado" });
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

    // helper: decode JWT payload without external lib (base64url)
    const decodeJwtPayload = (token) => {
      try {
        const parts = token.split('.');
        if (parts.length < 2) return null;
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
        const json = decodeURIComponent(atob(padded).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(json);
      } catch (e) {
        return null;
      }
    };

    useEffect(() => {
            // preferir user guardado por AuthService
            const userObj = AuthService.getUser();
            if (userObj) {
                setUser({ nombre: userObj.nombre || userObj.name || 'Usuario', rol: userObj.rol || userObj.role || 'Invitado' });
                return;
            }

            // fallback: intentar decodificar token sin dependencia externa
            const token = AuthService.getToken() || localStorage.getItem("token") || localStorage.getItem("veterinaria_token");
            if (token) {
                const decoded = decodeJwtPayload(token);
                if (decoded) {
                    setUser({ nombre: decoded.nombre || decoded.name || 'Usuario', rol: decoded.rol || decoded.role || 'Invitado' });
                    return;
                } else {
                    // si token inválido quitarlo y redirigir a inicio
                    console.error("Token inválido, borrando y redirigiendo");
                    try { localStorage.removeItem("token"); } catch(_) {}
                    try { localStorage.removeItem("veterinaria_token"); } catch(_) {}
                    navigate("/?error=invalidToken");
                }
            }
        }, [navigate]);

    return ( 
        <>
            <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <Box sx={{ 
                    minHeight: "100vh", 
                    height: "100dvh",
                    overflow: "hidden",
                    display: "flex",
                    ml: isMobile ? 0 : (isSidebarOpen ? "250px" : 0),
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    textAlign: "center", 
                    color: theme.palette.text.primary, 
                    background: (theme) => theme.palette.background.gradient, 
                    transition: "margin 0.3s ease-in-out", 
                    p: 2}} > 
                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: "column",  
                        alignItems: "center", 
                        gap: 2,
                        px: 2, }}> 
                    <Typography variant="h3" gutterBottom sx={{ 
                        color: theme.palette.text.primary, 
                        textShadow: theme.palette.mode === "dark" 
                        ? "2px 2px 4px rgba(255, 255, 255, 0.2)" 
                        : "2px 2px 4px rgba(0, 0, 0, 0.4)", }}> Bienvenido a  veterinaria, {user.nombre} </Typography> 
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, }}> Innovación y tecnología para potenciar tu negocio. </Typography> 
                    </Box>
                    <Footer /> 
                </Box>
        </>
    );
}

export default HomeLogin;
