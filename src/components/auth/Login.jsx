import { useState } from "react";
import { Box, TextField, Button, Alert, Link, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "../resetPassword/resetPassword";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from "@mui/material/styles";

// Use CRA env var (adapted from Vite snippet you provided)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5121';

const Login = ({ onSuccess } = {}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [openReset, setOpenReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = async (data) => {
    try {
      // Call backend login controller
      const response = await axios.post(`${API_BASE_URL.replace(/\/$/, '')}/api/LoginControlador/login`, data);
      const token = response.data?.token || response.data?.accessToken || response.data?.access_token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("veterinaria_token", token);
      }
      try { if (onSuccess) onSuccess(); } catch(_) {}
      // redirect to home-login after successful authentication
      navigate('/home-login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error en el inicio de sesión.");
    }
  };

  return (
    <>
        <Box sx={{
            width: "100%",
            maxWidth: 400,
            color: (theme) => theme.palette.text.primary,
            background: theme.palette.background.paper,
            borderRadius: 3,}}>
          {errorMessage && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("email", { required: "El correo es obligatorio" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{ backgroundColor: theme.palette.mode === "dark" ? "#1b1f24" : "#fff", 
                borderRadius: 1 }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("password", { required: "La contraseña es obligatoria" })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{ backgroundColor: theme.palette.mode === "dark" ? "#1b1f24" : "#fff", 
                borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, 
                border: 1, 
                borderColor: "#7dd1ff",
                textTransform: "none",
                boxShadow: `0 0 8px ${theme.palette.primary.light}`,
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.primary.main, 
                color: theme.palette.primary.contrastText,
                "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: `0 0 12px ${theme.palette.primary.light}`,}
              }}
              color="inherit"
            >
              Iniciar Sesión
            </Button>
            <Box textAlign="center" mt={2}>
              <Link component="button" onClick={() => setOpenReset(true)} color="#00a5ff" underline="hover">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </form>
        </Box>

      <ResetPasswordModal open={openReset} onClose={() => setOpenReset(false)} />
    </>
  );
};

export default Login;