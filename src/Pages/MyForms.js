// src/pages/MyForms.js
import React from 'react';
import { Box } from '@mui/material';
import FormCard from '../Componentes/FormCard';

const MyForms = () => {
  const forms = [
    { id: 1, title: 'Título do Formulário 1' },
    { id: 2, title: 'Título do Formulário 2' },
    // Adicione mais formulários conforme necessário
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '16px' }}>
      {forms.map(form => (
        <FormCard key={form.id} id={form.id} title={form.title} />
      ))}
    </Box>
  );
};

export default MyForms;
