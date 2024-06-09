// src/components/Profile.js
import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper, Button, Snackbar, Alert } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Teste',
    birthDate: '1990-01-01',
    email: 'Teste@exemplo.com',
    password: '********',
  });

  const [editingField, setEditingField] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = (field) => {
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
        backgroundColor: 'white',
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
              type={field === 'birthDate' ? 'date' : field === 'password' ? 'password' : 'text'}
              value={profile[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              disabled={editingField !== field}
              sx={{ flex: 2, marginRight: '8px', }}
              fullWidth
            />
            <IconButton onClick={() => editingField === field ? handleSave(field) : handleEdit(field)}>
              {editingField === field ? <SaveIcon style={{color:'white'}} /> : <EditIcon style={{color:'white'}}/>}
            </IconButton>
          </Box>
        ))}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
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
