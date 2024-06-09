
import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleFromToCodeForgotPassword = () => {
    navigate('/code-forgot-password');
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
          Informe o login para o qual deseja redefinir a senha
        </Typography>
        <TextField
          fullWidth
          placeholder="Login"
          sx={{ margin: '16px 0', input: { color: 'white' },
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
          },}}
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
            Voltar ao login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFromToCodeForgotPassword}
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

export default ForgotPassword;
