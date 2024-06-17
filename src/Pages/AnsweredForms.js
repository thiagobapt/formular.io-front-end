// src/pages/AnsweredForms.js
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ListAlt as ListAltIcon } from '@mui/icons-material';
import axios from 'axios';

// Função para obter os formulários respondidos do usuário
const GetAnsweredForms = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/answer/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

const AnsweredForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const data = await GetAnsweredForms(user_id);

        if (data && Array.isArray(data)) {
          setForms(data);
        } else {
          console.error("Dados recebidos não são um array", data);
          setForms([]); // Fallback para array vazio
        }
      } catch (error) {
        console.error("Erro ao buscar formulários: ", error);
      }
    };

    fetchForms();
  }, []);

  const handleOpenFormularIO = () => {
    window.open('/formular-io', '_blank');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '16px' }}>
      {forms.map(form => (
        <Card
          key={form.form_id}
          sx={{ width: 200, margin: '16px', padding: '16px', cursor: 'pointer' }}
          onClick={handleOpenFormularIO}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <ListAltIcon sx={{ fontSize: 64, color: '#7e57c2' }} />
              <Typography variant="h6" component="div" sx={{ marginTop: '8px', textAlign: 'center' }}>
                {form.form_name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AnsweredForms;
