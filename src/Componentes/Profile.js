import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Paper, Snackbar, Alert } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

// Função para obter o usuário
const GetUser = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${user_id}`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

// Função para atualizar um campo do usuário
const updateUserField = async (user_id, field, value) => {
  try {
    const response = await axios.patch(`http://localhost:3000/user/${user_id}`, {
      [`user_${field}`]: value
    });
    console.log(`${field} atualizado com sucesso:`, response.data);
  } catch (error) {
    console.error(`Erro ao atualizar ${field}:`, error.response?.data?.message || error.message);
  }
};

// Função para formatar a data para 'pt-BR'
const formatDateToPtBR = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

// Função para converter a data de 'pt-BR' para ISO
const formatDateToISO = (date) => {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`).toISOString();
};

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '********',
  });

  const [editingField, setEditingField] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        console.log('user_id:', user_id);

        if (user_id) {
          const userData = await GetUser(user_id);
          setProfile({
            name: userData.user_name || '',
            birthDate: userData.user_birthday ? formatDateToPtBR(userData.user_birthday) : '',
            email: userData.user_email || '',
            password: '********',
          });
        }
      } catch (error) {
        console.error("Erro: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (field) => {
    const user_id = localStorage.getItem("user_id");
    let value = profile[field];

    if (field === 'birthDate') {
      value = formatDateToISO(value);
    }

    await updateUserField(user_id, field, value);

    setEditingField(null);
    setSnackbarOpen(true);
  };

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '32px',
          backgroundColor: '#7e57c2',
          color: 'white',
          width: '80%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>
        {['name', 'birthDate', 'email', 'password'].map((field) => (
          <Box
            key={field}
            sx={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}
          >
            <Typography sx={{ flex: 1, textAlign: 'left' }}>
              {field === 'name' && 'Nome Completo'}
              {field === 'birthDate' && 'Data de nascimento'}
              {field === 'email' && 'Email'}
              {field === 'password' && 'Senha'}
            </Typography>
            <TextField
              type={field === 'password' ? 'password' : 'text'}
              value={profile[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              disabled={editingField !== field}
              placeholder={`Digite seu ${field}`}
              fullWidth
              sx={{
                flex: 2,
                marginRight: '8px',
                input: { color: 'white' },
                '& .MuiInputBase-input::placeholder': {
                  color: 'white',
                },
                '& .MuiInputBase-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            />
            <IconButton onClick={() => editingField === field ? handleSave(field) : handleEdit(field)}>
              {editingField === field ? <SaveIcon style={{ color: 'white' }} /> : <EditIcon style={{ color: 'white' }} />}
            </IconButton>
          </Box>
        ))}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Informações salvas com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
