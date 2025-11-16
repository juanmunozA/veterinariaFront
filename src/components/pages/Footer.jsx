import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ width: '100%', textAlign: 'center', py: 2 }}>
    <Typography variant="caption">© {new Date().getFullYear()} Veterinaria - Todos los derechos reservados</Typography>
  </Box>
);

export default Footer;
