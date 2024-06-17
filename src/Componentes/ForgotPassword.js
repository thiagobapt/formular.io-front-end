import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetUser = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${user_id}`,{
      user_id: user_id,
    }
    );
    return response.data;
  } catch (error) {
    console.error('Erro: ', error);
    throw error;
  }
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleFromToCodeForgotPassword = async () => {
    try {
      const response = await GetUser(localStorage.getItem("user_id"));
      if (response.user_email === email) {
        navigate('/new-password', { state: { email } });
      } else {
        setError('Email não encontrado');
      }
    } catch (error) {
      setError('Erro ao verificar o email');
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ 
            margin: '16px 0',
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
        {error && <Typography color="error">{error}</Typography>}
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
