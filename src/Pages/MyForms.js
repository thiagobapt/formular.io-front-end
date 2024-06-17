// src/pages/MyForms.js
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FormCard from '../Componentes/FormCard';
import axios from 'axios';

const GetForms = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/form/user/${user_id}`);
    console.log('Dados', response.data);
    return response.data;
  } catch (error) {
    console.log("Erro:", error);
  }
}

const MyForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const user_id = localStorage.getItem("user_id");
      const data = await GetForms(user_id);
      setForms(data);
    };

    fetchForms();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '16px' }}>
      {forms.map(form => (
        <FormCard key={form.form_id} id={form.form_id} title={form.form_name} />
      ))}
    </Box>
  );
};

export default MyForms;
