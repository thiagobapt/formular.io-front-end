// src/components/FormularIO.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const FormularIO = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', textAlign: 'center' }}>
        <Typography variant="h4" align="center" color="white">
          Formular.io
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Aqui pode adicionar o conteúdo principal do componente */}
      </Box>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', textAlign: 'center' }}>
        <Typography variant="h6" align="center" color="white">
          © Formular.io
        </Typography>
      </Box>
    </Box>
  );
};

export default FormularIO;
