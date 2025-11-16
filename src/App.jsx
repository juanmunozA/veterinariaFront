import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { Dialog, DialogContent, Box } from '@mui/material';
import ClientePage from './pages/ClientePage';
import ClienteForm from './components/cliente/ClienteForm';
import Login from './components/auth/Login';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';
import ProtectedRoute from './components/common/ProtectedRoute';
import MascotaPage from './pages/MascotaPage';
import MascotaForm from './components/mascota/MascotaForm';
import RazaPage from './pages/RazaPage';
import RazaForm from './components/raza/RazaForm';
import VeterinarioPage from './pages/VeterinarioPage';
import VeterinarioForm from './components/veterinario/VeterinarioForm';
import MedicamentoPage from './pages/MedicamentoPage';
import MedicamentoForm from './components/medicamento/MedicamentoForm';
import FormulaPage from './pages/FormulaPage';
import FormulaForm from './components/formula/FormulaForm';
import FormulaMedicamentoPage from './pages/FormulaMedicamentoPage';
import FormulaMedicamentoForm from './components/formulaMedicamento/FormulaMedicamentoForm';
import HistorialPage from './pages/HistorialPage';
import HistorialForm from './components/historial/HistorialForm';
import Footer from './components/pages/Footer'; // usado dentro del modal

const App = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);

  return (
    <Router>
      <Navbar onOpenLogin={() => setLoginOpen(true)} />
      <div style={{ padding: '20px' }}>
        {/* Dialog centrado vertical/horizontal; Paper tamaño controlado */}
        <Dialog
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            // fuerza al contenedor del Dialog a centrar el paper
            '& .MuiDialog-container': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            // estilo del paper (ancho máximo y borderRadius)
            '& .MuiDialog-paper': {
              width: 'min(720px, 95%)',
              borderRadius: 2,
              mx: 2,
            },
          }}
        >
          <DialogContent>
            {/* Login dentro del Dialog */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Login onSuccess={() => setLoginOpen(false)} />
              {/* Footer centrado debajo del contenido del modal */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Footer />
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-login" element={<HomeLogin />} />
          {/* /login ya no existe: redirigir al root */}
          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route path="/clientes" element={
            <ProtectedRoute>
              <ClientePage />
            </ProtectedRoute>
          } />
          <Route path="/clientes/nuevo" element={
            <ProtectedRoute>
              <ClienteForm />
            </ProtectedRoute>
          } />
          <Route path="/clientes/:id" element={
            <ProtectedRoute>
              <ClienteForm />
            </ProtectedRoute>
          } />

          <Route path="/mascotas" element={
            <ProtectedRoute>
              <MascotaPage />
            </ProtectedRoute>
          } />
          <Route path="/mascotas/nuevo" element={
            <ProtectedRoute>
              <MascotaForm />
            </ProtectedRoute>
          } />
          <Route path="/mascotas/:id" element={
            <ProtectedRoute>
              <MascotaForm />
            </ProtectedRoute>
          } />

          <Route path="/razas" element={
            <ProtectedRoute>
              <RazaPage />
            </ProtectedRoute>
          } />
          <Route path="/razas/nuevo" element={
            <ProtectedRoute>
              <RazaForm />
            </ProtectedRoute>
          } />
          <Route path="/razas/:id" element={
            <ProtectedRoute>
              <RazaForm />
            </ProtectedRoute>
          } />

          <Route path="/veterinarios" element={
            <ProtectedRoute>
              <VeterinarioPage />
            </ProtectedRoute>
          } />
          <Route path="/veterinarios/nuevo" element={
            <ProtectedRoute>
              <VeterinarioForm />
            </ProtectedRoute>
          } />
          <Route path="/veterinarios/:id" element={
            <ProtectedRoute>
              <VeterinarioForm />
            </ProtectedRoute>
          } />

          <Route path="/medicamentos" element={
            <ProtectedRoute>
              <MedicamentoPage />
            </ProtectedRoute>
          } />
          <Route path="/medicamentos/nuevo" element={
            <ProtectedRoute>
              <MedicamentoForm />
            </ProtectedRoute>
          } />
          <Route path="/medicamentos/:id" element={
            <ProtectedRoute>
              <MedicamentoForm />
            </ProtectedRoute>
          } />

          <Route path="/formulas" element={
            <ProtectedRoute>
              <FormulaPage />
            </ProtectedRoute>
          } />
          <Route path="/formulas/nuevo" element={
            <ProtectedRoute>
              <FormulaForm />
            </ProtectedRoute>
          } />
          <Route path="/formulas/:id" element={
            <ProtectedRoute>
              <FormulaForm />
            </ProtectedRoute>
          } />

          <Route path="/formulamedicamento" element={
            <ProtectedRoute>
              <FormulaMedicamentoPage />
            </ProtectedRoute>
          } />
          <Route path="/formulamedicamento/nuevo" element={
            <ProtectedRoute>
              <FormulaMedicamentoForm />
            </ProtectedRoute>
          } />
          <Route path="/formulamedicamento/:id" element={
            <ProtectedRoute>
              <FormulaMedicamentoForm />
            </ProtectedRoute>
          } />

          <Route path="/historial" element={
            <ProtectedRoute>
              <HistorialPage />
            </ProtectedRoute>
          } />
          <Route path="/historial/nuevo" element={
            <ProtectedRoute>
              <HistorialForm />
            </ProtectedRoute>
          } />
          <Route path="/historial/:id" element={
            <ProtectedRoute>
              <HistorialForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
