import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#825DEA',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '32px',
          backgroundColor: '#7e57c2',
          color: '#000',
          width: '80%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color={'white'} gutterBottom>
          Esqueci minha senha
        </Typography>
        <Typography variant="subtitle1" color={'white'} gutterBottom>
          Redefinir Senha
        </Typography>
        <TextField
          fullWidth
          placeholder="Nova Senha"
          type='password'
          sx={{ margin: '16px 0' }}
        />
        <TextField
          fullWidth
          placeholder="Confirmar Senha"
          type='password'
          sx={{ margin: '16px 0' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackToLogin}
            sx={{
              backgroundColor: 'purple',
              '&:hover': {
                backgroundColor: 'darkpurple',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackToLogin}
            sx={{
              backgroundColor: 'purple',
              '&:hover': {
                backgroundColor: 'darkpurple',
              },
            }}
          >
            Confirmar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewPassword;
