// src/pages/FormDetail.js
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MainForm from '../Componentes/MainForm';
import Myformcreated from '../Componentes/MyFormCreated';
import axios from 'axios';


const ResponseView = ({ userName }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
    <TextField 
      label="Usuário:" 
      variant="outlined" 
      sx={{ marginRight: '8px', width: '500px' }} 
      value={userName} 
      InputProps={{
        readOnly: true,
      }} 
    />
    <Button 
      variant="contained" 
      color="secondary" 
      sx={{
        backgroundColor: '#7e57c2',
        ':hover': {
          backgroundColor: '#5e35b1',
        },
      }}
      onClick={() => {window.open('/formular-io', '_blank');}}
    >
      Ver Resposta
    </Button>
  </Box>
);

const FormDetail = () => {
  const [selectedView, setSelectedView] = useState('form');
  const [userName, setUserName] = useState('');

  const fetchUserName = async () => {
    try {
      const form_id = localStorage.getItem("form_id");
      const response = await axios.get(`http://localhost:3000/answer/form/${form_id}`);
      const answers = response.data;

      if (answers.length > 0) {
        setUserName(answers[0].user.user_name);  // Assuming we want to display the user_name of the first answer
      } else {
        setUserName('No answers found');
      }
    } catch (error) {
      console.error("Erro ao buscar as respostas:", error);
    }
  };

  const handleResponseClick = async () => {
    await fetchUserName();
    setSelectedView('response');
  };

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'form':
        return <Myformcreated />;
      case 'response':
        return <ResponseView userName={userName} />;
      case 'stats':
        return <div>Estatística não implementada</div>; // Placeholder for stats
      default:
        return <Myformcreated />;
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
          onClick={handleResponseClick}
          sx={{ marginRight: '8px', backgroundColor: selectedView === 'response' ? '#7e57c2' : 'inherit', color: ''}}
        >
          Resposta
        </Button>
      </Box>
      {renderSelectedView()}
    </Box>
  );
};

export default FormDetail;
