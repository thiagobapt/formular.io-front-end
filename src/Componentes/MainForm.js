// src/components/MainForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Form from './Form';
import { Add as AddIcon } from '@mui/icons-material';

const MainForm = () => {
  const [forms, setForms] = useState([{ id: 1 }]);

  const handleAddForm = () => {
    setForms([...forms, { id: forms.length + 1 }]);
  };

  const handleRemoveForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <TextField
        placeholder="Formulário sem título"
        variant="outlined"
        margin="normal"
        style={{ backgroundColor: '#9e7be3', borderRadius: '8px', width: '600px', margin: '0 auto', marginBottom: '32px'}}
      />
      {forms.map((form, index) => (
        <Box key={form.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: index !== forms.length - 1 ? '32px' : '0' }}>
          <Form id={form.id} removeForm={handleRemoveForm} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button variant="contained" onClick={handleAddForm} startIcon={<AddIcon />} color='secondary'>
          Adicionar Formulário
        </Button>
      </Box>
    </Box>
  );
};

export default MainForm;
