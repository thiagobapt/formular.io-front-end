// src/components/RespondForm.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const RespondForm = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#7e57c2',
            marginRight: 'auto',
            ':hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          Login
        </Button>
        <Typography variant="h4" align="center" color="white" sx={{ flexGrow: 1 }}>
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

export default RespondForm;
