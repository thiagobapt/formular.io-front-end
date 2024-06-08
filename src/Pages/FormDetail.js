// src/pages/FormDetail.js
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MainForm from '../Componentes/MainForm';

const ResponseView = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
    <TextField label="Usuário:" variant="outlined" sx={{ marginRight: '8px', width:'500px' }} InputProps={{
              readOnly: true,
            }} />
    <Button 
      variant="contained" 
      color="primary" 
      sx={{
        backgroundColor: '#7e57c2',
        ':hover': {
          backgroundColor: '#5e35b1',
        },
      }}
    >
      Ver Resposta
    </Button>
  </Box>
);

const FormDetail = () => {
  const [selectedView, setSelectedView] = useState('form');

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'form':
        return <MainForm />;
      case 'response':
        return <ResponseView />;
      case 'stats':
        return <div>Estatística não implementada</div>; // Placeholder for stats
      default:
        return <MainForm />;
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Button
          variant={selectedView === 'form' ? 'contained' : 'outlined'}
          onClick={() => setSelectedView('form')}
          sx={{ marginRight: '8px', backgroundColor: selectedView === 'form' ? '#7e57c2' : 'inherit' }}
        >
          Formulário
        </Button>
        <Button
          variant={selectedView === 'response' ? 'contained' : 'outlined'}
          onClick={() => setSelectedView('response')}
          sx={{ marginRight: '8px', backgroundColor: selectedView === 'response' ? '#7e57c2' : 'inherit' }}
        >
          Resposta
        </Button>
        <Button
          variant={selectedView === 'stats' ? 'contained' : 'outlined'}
          onClick={() => setSelectedView('stats')}
          sx={{ backgroundColor: selectedView === 'stats' ? '#7e57c2' : 'inherit' }}
        >
          Estatística
        </Button>
      </Box>
      {renderSelectedView()}
    </Box>
  );
};

export default FormDetail;
