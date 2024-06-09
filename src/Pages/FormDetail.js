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
      color="secondary" 
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
          color="secondary"
          variant={selectedView === 'form' ? 'contained' : 'text'}
          onClick={() => setSelectedView('form')}
          sx={{ marginRight: '8px', backgroundColor: selectedView === 'form' ? '#7e57c2' : 'inherit' }}
        >
          Formulário
        </Button>
        <Button
          color="secondary"
          variant={selectedView === 'response' ? 'contained' : 'text'}
          onClick={() => setSelectedView('response')}
          sx={{ marginRight: '8px', backgroundColor: selectedView === 'response' ? '#7e57c2' : 'inherit', color: ''}}
        >
          Resposta
        </Button>
        <Button
          color="secondary"
          variant={selectedView === 'stats' ? 'contained' : 'text'}
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
