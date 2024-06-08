// src/pages/AnsweredForms.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ListAlt as ListAltIcon } from '@mui/icons-material';

const AnsweredForms = () => {
  const forms = [
    { id: 3, title: 'Formulário Respondido 1' },
    { id: 4, title: 'Formulário Respondido 2' },
    // Adicione mais formulários conforme necessário
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '16px' }}>
      {forms.map(form => (
        <Card
          key={form.id}
          sx={{ width: 200, margin: '16px', padding: '16px', cursor: 'default' }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <ListAltIcon sx={{ fontSize: 64, color: '#7e57c2' }} />
              <Typography variant="h6" component="div" sx={{ marginTop: '8px', textAlign: 'center' }}>
                {form.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AnsweredForms;
